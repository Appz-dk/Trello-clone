"use client"

import { ActivityIcon } from "lucide-react"

import { AuditLog } from "@prisma/client"
import { Skeleton } from "@/components/ui/skeleton"
import { ActivityItem } from "@/components/activity-item"

type Props = {
  logsData: AuditLog[]
}

export const Activity = ({ logsData }: Props ) => {
  return (
    <div className="w-full flex items-start gap-3">
      <ActivityIcon className="w-5 h-5 text-neutral-700 mt-0.5"/>
      <div className="w-full space-y-2">
        <p className="text-neutral-700 font-semibold">Activity</p>
        <ol className="space-y-3">
          {logsData.map(log => (
            <ActivityItem key={log.id} auditLog={log} />
            ))}
        </ol>
      </div>
    </div>
  )
}

Activity.Skeleton = function() {
  return (
    <div className="w-full flex items-start gap-2">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div className="w-full space-y-2">
        <Skeleton className="w-24 h-6 bg-neutral-200"/>
        <Skeleton className="w-full h-10 bg-neutral-200"/>
      </div>
    </div>
  )
}