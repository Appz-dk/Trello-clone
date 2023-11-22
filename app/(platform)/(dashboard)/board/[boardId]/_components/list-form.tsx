"use client"

import { useState, useRef, ElementRef } from "react"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { Plus, X } from "lucide-react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { useParams } from "next/navigation"

import { createList } from "@/actions/create-list"
import { useAction } from "@/hooks/use-action"

import { Button } from "@/components/ui/button"
import { ListWrapper } from "./list-wrapper"
import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"

export const ListForm = () => {
  const { execute, fieldErrors, isLoading } = useAction(createList, {
    onSuccess(data) {
      toast.success(`Created ${data.title} list`)
      onDisableCreating()
      router.refresh()
    },
    onError(error) {
      toast.error(error)
    },
    onComplete(fieldErrors) {
      setLocalFieldErrors(fieldErrors)
    },
  })
  
  const router = useRouter()
  const { pending } = useFormStatus()
  const params = useParams()
  const titleRef = useRef<ElementRef<"input">>(null)
  const formRef = useRef<ElementRef<"form">>(null)
  const [isCreating, setIsCreating] = useState(false)
  // Used to reset the fieldErrors if the form gets re-rendered
  const [localFieldErrors, setLocalFieldErrors] = useState(fieldErrors) 

  const onEnableCreating = () => {
    setIsCreating(true)
  }

  const onDisableCreating = () => {
    setIsCreating(false)
    setLocalFieldErrors(undefined)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") onDisableCreating()
  }

  // handles keydown and clicking outside of the form
  useEventListener("keydown", onKeyDown)
  useOnClickOutside(formRef, onDisableCreating)

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title")?.toString()?.trim() as string
    const boardId = params.boardId as string

    execute({ title, boardId })
  }

  if (isCreating) {
    return (
      <ListWrapper >
        <form className="bg-white w-full rounded-md p-3 shadow-md flex flex-col justify-center gap-3" action={onSubmit} ref={formRef}>
          <FormInput 
            className="text-sm transition font-medium" 
            ref={titleRef} 
            id="title" 
            placeholder="Enter list title..." 
            disabled={pending || isLoading}
            autoFocus
            errors={localFieldErrors} 
          />
          <div className="flex gap-2">
            <FormSubmit className="text-sm" size="sm" variant="primary">
              Add list
            </FormSubmit>
            <Button className="text-sm" size="icon" variant="ghost" onClick={onDisableCreating}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <Button 
        className="w-full flex gap-2 items-center justify-start rounded-md p-3 text-black font-medium text-sm bg-white/80 hover:bg-white/50 transition"
        onClick={onEnableCreating}
      >
        <Plus className="w-4 h-4" /> Add a list
      </Button>
    </ListWrapper>
  )
}