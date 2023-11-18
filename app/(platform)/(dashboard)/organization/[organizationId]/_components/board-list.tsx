import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { HelpCircle, User2 } from "lucide-react"

export const BoardList = () => {

  const hintDescription = `Free Workspaces can have up to 5 open boards. For unlimitted boards, upgrade this worksspace.`

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-neutral-700 font-semibold text-lg">
        <User2 className="h-6 w-6" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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