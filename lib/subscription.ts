import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";


const DAY_IN_MS = 86_400_000 // 24 * 60 * 60 * 1000

export const checkSubscription = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return false
  }

  const subscription = await db.orgSubscription.findUnique({
    where: {
      orgId
    }
  })

  if (!subscription || !subscription.stripeCurrentPeriodEnd) {
    return false
  } 

  const isValid = subscription.stripePriceId && subscription.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()

  return Boolean(isValid)
}