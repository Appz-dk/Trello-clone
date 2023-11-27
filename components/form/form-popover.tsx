"use client"

import { ElementRef, forwardRef, useRef } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { toast } from "sonner"

import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { createBoard } from "@/actions/create-board"
import { useProModal } from "@/hooks/use-pro-modal"

import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"
import { FormPicker } from "./form-picker"
import { MAX_LIMIT_MSG } from "@/constants/boards"


type Props = {
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "center" | "start" | "end";
  sideOffset?: number;
}

export const FormPopover: React.FC<Props> = ({ children, align, side = "bottom", sideOffset = 0 }) => {
  const { onOpen: onOpenProModal } = useProModal(state => state)
  const router = useRouter()
  const closePopoverRef = useRef<ElementRef<"button">>(null)
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: data => {
      toast.success("Created a new Board")
      // Close popover on success & redirect to new board
      closePopoverRef.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: error => {
      toast.error(error)
      if (error === MAX_LIMIT_MSG) {
        onOpenProModal()
      }
    }
  })

  const handleCreateBoard = async (formData: FormData) => {
    const title = formData.get("title") as string
    const image = formData.get("image") as string

    await execute({ title, image })
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
        <div className="text-sm font-medium text-center text-neutral-700">
          <PopoverCloseBtn ref={closePopoverRef} />
          Create board
          <form className="flex flex-col text-left gap-2 mt-4" action={handleCreateBoard}>
            <div className="space-y-4">
              <FormPicker id="image" errors={fieldErrors} />
              <FormInput id="title" label="Board title" type="text" errors={fieldErrors}/>
            </div>
            <FormSubmit>
              Create
            </FormSubmit>
          </form>
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