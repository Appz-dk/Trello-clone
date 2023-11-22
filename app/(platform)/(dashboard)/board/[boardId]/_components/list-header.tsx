"use client"

import { useState, useRef, ElementRef } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { updateList } from "@/actions/update-list"

import { FormInput } from "@/components/form/form-input"
import { List } from "@prisma/client"
import { ListOptions } from "./list-options"

type Props = {
  data: List;
  onAddCard: () => void
}

export const ListHeader = ({ data, onAddCard }: Props) => {
  const { execute, isLoading } = useAction(updateList, {
    onSuccess(data) {
      toast.success(`Renamed list to "${data.title}"`)
      setListTitle(data.title)
      onDisableEditing()
    },
    onError(error) {
      toast.error(error)
    },
  }) 

  const inputRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [listTitle, setListTitle] = useState(data.title)

  const onEnableEditing = () => {
    setIsEditing(true)
  }

  const onDisableEditing = () => {
    setIsEditing(false)
  }

  useOnClickOutside(inputRef, onDisableEditing)

  useEventListener("keydown", e => {
    if (e.code === "Escape")  formRef.current?.requestSubmit()
  })
  

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title")?.toString().trim() as string
    const id = formData.get("id")?.toString().trim() as string
    const boardId = formData.get("boardId")?.toString().trim() as string

    if (title === listTitle) return onDisableEditing()

    execute({title, id, boardId})
  }

  const onBlur = () => {
    formRef.current?.requestSubmit()
  }


  const headerContent = isEditing ? (
      <form action={onSubmit} ref={formRef} className="flex-grow">
        <FormInput 
          className="max-w-[90%] bg-inherit font-medium border-transparent focus:bg-white h-6 focus-visible:ring-offset-0" 
          id="title" 
          ref={inputRef} 
          defaultValue={listTitle}
          placeholder="Enter list title.."
          // Try to sumbit the form I guess
          onBlur={onBlur}
          disabled={isLoading}
          props={{
            onFocus: e => e.target.select()
          }} 
          autoFocus
        />
        {/* Could also pass these to the onSubmit function (But trying something new) */}
        <input className="hidden" id="id" name="id" value={data.id} readOnly/>
        <input className="hidden" id="boardId" name="boardId" value={data.boardId} readOnly/>
        <button type="submit" hidden />
      </form>
    ) : (
      <div 
        className="text-sm flex items-center font-medium px-2 cursor-pointer flex-grow max-w-[85%]" 
        onClick={onEnableEditing}
        >
        <p className="truncate">{listTitle}</p> 
      </div>
    )

  return (
    <div className="flex justify-between w-full">
      {headerContent}
      <ListOptions data={data} onAddCard={onEnableEditing} />
    </div>
  )
}