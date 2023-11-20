"use client"

import { MoreHorizontal, X } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";
import { toast } from "sonner";

type Props = {
  id: string
}

export const BoardOptions = ({ id }: Props) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    }
  })

  // TODO: Maybe async await is not needed here
  const handleDeleteBoard = async () => {
    await execute({id})
  }

  return (
    <Popover>
        <PopoverTrigger className="flex items-center" asChild>
          <Button className="border-none w-auto h-auto p-1" variant="transparent" > 
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 py-3" side="bottom" align="start">
          <div className="text-sm font-semibold text-neutral-700 text-center flex flex-col gap-3 items-star">
            <div className="w-full text-center">
              <PopoverCloseBtn />
              Board actions
            </div>
            <Button onClick={handleDeleteBoard} disabled={isLoading} variant="ghost" className="text-sm font-normal w-full justify-start px-4 rounded-none">
              Delete this board
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