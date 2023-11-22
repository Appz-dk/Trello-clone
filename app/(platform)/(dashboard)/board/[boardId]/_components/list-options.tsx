import { ElementRef, forwardRef, useRef } from "react"
import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"

import { List } from "@prisma/client"
import { deleteList } from "@/actions/delete-list"
import { copyList } from "@/actions/copy-list"

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"

type Props = {
  data: List
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: Props ) => {
  const popoverCloseRef = useRef<ElementRef<"button">>(null)

  const { execute: executeDelete, isLoading: isDeleting } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`List ${data.title} deleted`)
      popoverCloseRef.current?.click()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const { execute: executeCopy, isLoading: isCopying } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`List ${data.title} copied`)
      popoverCloseRef.current?.click()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const onDeleteList = (id: string, boardId: string) => {
    executeDelete({ id, boardId })
  }

  const onCopyList = (id: string, boardId: string) => {
    executeCopy({ id, boardId })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex-shrink flex items-center p-1" role="button">
          <MoreHorizontal className="w-4 h-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 py-3" side="bottom" align="start" alignOffset={-40} >
          <div className="text-sm font-semibold text-neutral-700 text-center flex flex-col gap-1 items-star">
            <div className="w-full text-center mb-1">
              <PopoverCloseBtn ref={popoverCloseRef} />
              List actions
            </div>
            <Button 
              className="text-sm font-normal w-full justify-start px-4 rounded-none" 
              variant="ghost" 
              onClick={onAddCard}
            >
              Add a card
            </Button>
            {/* Could change Copy & Delete to forms and use action={} instead of buttons */}
            <Button 
              className="text-sm font-normal w-full justify-start px-4 rounded-none" 
              variant="ghost" 
              onClick={() => onCopyList(data.id, data.boardId)}
              disabled={isCopying}
            >
              Copy list
            </Button>      
            <Button 
              className="text-sm font-normal w-full justify-start px-4 rounded-none" 
              variant="ghost" 
              onClick={() => onDeleteList(data.id, data.boardId)}
              disabled={isDeleting}
            >
              Delete list
            </Button>      
          </div>
        </PopoverContent>
    </Popover>
  )
}


const PopoverCloseBtn = forwardRef<HTMLButtonElement>((_, ref)  => {
  return (
    <PopoverClose ref={ref} asChild>
      <Button className="w-auto h-auto p-1 absolute top-2 right-2" variant="ghost">
        <X className="w-4 h-4"/>
      </Button>
    </PopoverClose>
  )
})

PopoverCloseBtn.displayName = 'PopoverCloseBtn'; // It's a good practice to set a displayName for components created with forwardRef