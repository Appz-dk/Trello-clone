import { checkSubscription } from "@/lib/subscription"
import { Info } from "../_components/info"
import { Separator } from "@/components/ui/separator"
import { SubscriptionButton } from "../_components/subscription-button"


const BillingPage = async () => {
  const isSubscriped = await checkSubscription()

  return (
    <div className="w-full">
      <Info isSubscriped={isSubscriped} />
      <Separator className="mt-2 mb-3"/>
      <SubscriptionButton isSubscriped={isSubscriped} />
    </div>
  )
}

export default BillingPage