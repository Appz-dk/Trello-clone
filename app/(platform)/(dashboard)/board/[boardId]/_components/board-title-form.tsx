"use client"

import { ElementRef, useRef, useState } from "react"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { updateBoard } from "@/actions/update-board"
import { Board } from "@prisma/client"

import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"


type Props = {
  board: Board
}

export const BoardTitleForm = ({ board }: Props) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated!`)
      setBoardTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
    onComplete: (fieldErrors) => {
      if (fieldErrors) toast.error(fieldErrors?.title, {
        style: {
          color: "rgb(244 63 94)" // tailwind rose-500
        }
      })
    }
  })

  const titleRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [boardTitle, setBoardTitle] = useState(board.title)

  const enableEditing = () => {
    setIsEditing(true)

    // Focus input
    // If this causes any problems try with autoFocus and onFocus={e => e.target.select()}
    // on the FormInput (Have to accept the new props)
    setTimeout(() => {
      titleRef.current?.focus()
      titleRef.current?.select()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string

    await execute({title, id: board.id })
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }

  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="flex items-center gap-2">
        {/* TODO: Not sure about focus-visible:ring-offset-0 (default is 2) */}
        <FormInput 
          ref={titleRef} 
          id="title" 
          className="bg-transparent text-lg font-semibold h-7 px-3 py-1 border-none focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0"
          defaultValue={boardTitle}
          onBlur={onBlur}
        />
      </form>
    )
  }

  return (
    // TODO: Not sure about border-none - Could be hard for a user to know that this is clickable
    <Button onClick={enableEditing} className="font-semibold text-lg w-auto h-auto px-3 py-1 border-none" variant="transparent">
      {boardTitle}
    </Button>
  )
}