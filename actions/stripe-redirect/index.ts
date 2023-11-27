"use server"

import { auth, currentUser } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { stripeRedirectSchema } from "./schema"

import { absoluteUrl } from "@/lib/utils"
import { stripe } from "@/lib/stripe"
import { siteName } from "@/config/site"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  const user = await currentUser()

  // Check user is authenticated 
  if (!userId || !orgId || !user) return { error: "Unauthorized" }

  const settingsUrl = absoluteUrl(`/organization/${orgId}`)

  let url = ""

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId
      }
    })

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl
      })

      url = stripeSession.url
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        cancel_url: settingsUrl,
        success_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: `${siteName} Pro`,
                description: "Unlimited boards for your organization"
              },
              unit_amount: 2000,
              recurring: {
                interval: "month"
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          orgId
        }
      })

      url = stripeSession.url || ""
    }


  } catch (error) {
    return {
      error: "Stripe processing error!"
    }
  }

  revalidatePath(`/organization/${orgId}`)
  return {
    data: url
  }
}

export const stripeRedirect = createSafeAction(stripeRedirectSchema, handler)