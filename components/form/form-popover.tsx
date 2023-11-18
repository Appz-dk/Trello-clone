"use client"

import { X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { createBoard } from "@/actions/create-board"

import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"

import { Button } from "@/components/ui/button"

type Props = {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "center" | "start" | "end";
  sideOffset?: number;
}

export const FormPopover: React.FC<Props> = ({ children, align, side = "bottom", sideOffset = 0 }) => {
  const { execute, fieldErrors, isLoading } = useAction(createBoard, {
    onSucces: data => console.log("Created a new Board", data),
    onError: error => console.log("Create board error", error)
  })

  const handleCreateBoard = async (formData: FormData) => {
    const title = formData.get("title") as string
    
    if (!title) return

    await execute({ title })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        className="w-80 pt-3"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        {/* TODO: Create form */}
        <div className="text-sm font-medium text-center text-neutral-700">
          <PopoverCloseBtn />
          Create board
          <form className="flex flex-col text-left gap-2 mt-4" action={handleCreateBoard}>
            <div className="space-y-4">
             <FormInput id="title" label="Board title" type="text" errors={fieldErrors}/>
            </div>
            <FormSubmit>
              Submit
            </FormSubmit>
          </form>
        </div>
        
      </PopoverContent>
    </Popover>
  )
}

const PopoverCloseBtn = () => {
  return (
    <PopoverClose>
      <Button className="w-auto h-auto p-1 absolute top-2 right-2" variant="ghost">
        <X className="w-4 h-4"/>
      </Button>
    </PopoverClose>
  )
}