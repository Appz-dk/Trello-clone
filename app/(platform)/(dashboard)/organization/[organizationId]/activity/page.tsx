import { Separator } from "@/components/ui/separator"
import { Info } from "../_components/info"
import { ActivityList } from "../_components/activity-list"
import { Suspense } from "react"

const ActivityPage = () => {
  return (
    <div className="w-full space-y-2">
      <Info />
      <Separator />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  )
}

export default ActivityPage