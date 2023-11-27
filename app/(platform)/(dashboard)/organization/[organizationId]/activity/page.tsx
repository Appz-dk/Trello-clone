import { Separator } from "@/components/ui/separator"
import { Info } from "../_components/info"
import { ActivityList } from "../_components/activity-list"
import { Suspense } from "react"
import { checkSubscription } from "@/lib/subscription"

const ActivityPage = async () => {
  const isSubscriped = await checkSubscription()

  return (
    <div className="w-full space-y-2">
      <Info isSubscriped={isSubscriped} />
      <Separator />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}

export default ActivityPage