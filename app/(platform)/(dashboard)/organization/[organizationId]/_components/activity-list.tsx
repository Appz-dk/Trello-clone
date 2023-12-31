import { ActivityItem } from "@/components/activity-item"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


export const ActivityList = async () => {
  const { orgId } = auth()
  
  if (!orgId) {
    redirect("select-org")
  }

  const logs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc"
    }
  })


  return (
    <ol className="space-y-4 mt-4">
      {logs.length ? (
        logs.map((log) => <ActivityItem key={log.id} auditLog={log} />)
      ) : (
        <p className="block text-muted-foreground text-center text-sm">No activity found in this organization</p>
      )}
    </ol>
  )
}

ActivityList.Skeleton = function() {
  return (
    <ol className="space-y-4 mt-4">
      <div className="w-[75%] flex items-start gap-2">
        <Skeleton className="w-8 h-8 bg-neutral-200" />
        <Skeleton className="w-[75%] h-8 bg-neutral-200"/>
      </div>
      <div className="w-[75%] flex items-start gap-2">
        <Skeleton className="w-8 h-8 bg-neutral-200" />
        <Skeleton className="w-[60%] h-8 bg-neutral-200"/>
      </div>
      <div className="w-[75%] flex items-start gap-2">
        <Skeleton className="w-8 h-8 bg-neutral-200" />
        <Skeleton className="w-[75%] h-8 bg-neutral-200"/>
      </div>
      <div className="w-[75%] flex items-start gap-2">
        <Skeleton className="w-8 h-8 bg-neutral-200" />
        <Skeleton className="w-[55%] h-8 bg-neutral-200"/>
      </div>
      <div className="w-[75%] flex items-start gap-2">
        <Skeleton className="w-8 h-8 bg-neutral-200" />
        <Skeleton className="w-[80%] h-8 bg-neutral-200"/>
      </div>
    </ol>
  )
}