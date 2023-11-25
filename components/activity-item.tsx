import { format } from "date-fns"

import { AuditLog } from "@prisma/client"
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { generateLogMessage } from "@/lib/generate-log-message"

type Props = {
  auditLog: AuditLog
}

export const ActivityItem = ({ auditLog }: Props) => {
  return (
    <li className="flex items-center gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={auditLog.userImage} />
      </Avatar>
      <div className="flex flex-col gap-0.5 text-muted-foreground w-full">
        <p className="text-sm line-clamp-2 sm:flex sm:flex-row sm:line-clamp-1">
          <span className="font-semibold lowercase text-neutral-700">
            {auditLog.userName}
          </span>
          <span className="block ml-0 sm:ml-1">{generateLogMessage(auditLog)}</span>
        </p>
        <p className="text-xs">{format(new Date(auditLog.createdAt), "d MMM, yyyy 'at' h:mm a")}</p>
      </div>
    </li>
  )
}