import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers"

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error) {
    return new NextResponse("Stripe Webhook error", { status: 400 })
  }

  // This happens after a successful checkout
  const session = event.data.object as Stripe.Checkout.Session

  // User creates a subscription for the first time
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    if (!session?.metadata?.orgId) {
      return new NextResponse("Stripe subscription failed - Organization ID is required", { status: 400 })
    }

    await db.orgSubscription.create({
      data: {
        orgId: session.metadata.orgId,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCustomerId: subscription.customer?.toString(),
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      }
    })
  }

  // User renewed their subscription
  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await db.orgSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      }
    })
  }

  return new NextResponse(null, { status: 200 })
}