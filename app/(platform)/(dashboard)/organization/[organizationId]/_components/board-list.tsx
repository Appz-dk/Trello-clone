import Link from "next/link"
import { redirect } from "next/navigation"
import { HelpCircle, User2 } from "lucide-react"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

import { Skeleton } from "@/components/ui/skeleton"
import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"

export const BoardList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect("/select-org")
  }


  // Uncomment to simulate a longer fetching time
  // await new Promise(resolve => setTimeout(resolve, 2000))

  const boards = await db.board.findMany({
    where: {
      orgId
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  
  const hintDescription = `Free Workspaces can have up to 5 open boards. For unlimitted boards, upgrade this worksspace.`

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-neutral-700 font-semibold text-lg">
        <User2 className="h-6 w-6" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map(board => (
          <Link
            key={board.id} 
            href={`/board/${board.id}`}
            style={{
              backgroundImage: `url(${board.imageThumbUrl})`
            }}
            className="relative group rounded-md bg-no-repeat bg-cover bg-center aspect-video p-2 overflow-hidden bg-sky-700"
          >
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition" />
            <p className="relative truncate text-white text-sm font-semibold">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="flex flex-col items-center justify-center gap-2 aspect-video h-full w-full bg-muted rounded-md hover:opacity-75 transition relative"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description={hintDescription}
              >
              {/* TODO: Could move the positioning styling into the Hint component on the tooltip trigger */}
              <HelpCircle className="w-4 h-4 absolute bottom-2 right-2" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  ) 
}

BoardList.Skeleton = function() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full rounded-md" />
      <Skeleton className="aspect-video h-full w-full rounded-md" />
      <Skeleton className="aspect-video h-full w-full rounded-md" />
      <Skeleton className="aspect-video h-full w-full rounded-md" />
      <Skeleton className="aspect-video h-full w-full rounded-md" />
      <Skeleton className="aspect-video h-full w-full rounded-md" />
      <Skeleton className="aspect-video h-full w-full rounded-md" />
    </div>
  )
}