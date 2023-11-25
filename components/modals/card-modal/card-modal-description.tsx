"use client"

import { ElementRef, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { AlignLeft } from "lucide-react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { toast } from "sonner"

import { CardWithList } from "@/types/types"
import { useParams } from "next/navigation"
import { useAction } from "@/hooks/use-action"
import { updateCard } from "@/actions/update-card"

import { FormTextarea } from "@/components/form/form-textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"

type Props = {
  data: CardWithList
}

export const CardModalDescription = ({ data }: Props) => {
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({queryKey: ["card", data.id]})
      toast.success(`Updated card "${data.title}"`)
      setDescription(data.description)
      onDisableEditing()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const queryClient = useQueryClient()
  const formRef = useRef<ElementRef<"form">>(null)
  const textareaRef = useRef<ElementRef<"textarea">>(null)
  const params = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(data.description)

  const onEnableEditing = () => {
    setIsEditing(true)
  }

  const onDisableEditing = () => {
    setIsEditing(false)
  }


  useOnClickOutside(formRef, onDisableEditing)
  useEventListener("keydown", e => {
    e.stopPropagation()
    if (e.code === "Enter" && !e.shiftKey) {
      formRef.current?.requestSubmit()
    }
  })

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description")?.toString().trim() as string
    const boardId = params.boardId as string

    execute({ id: data.id, description, boardId })
  }



  return (
    <div className="flex items-start gap-x-2 w-full">
      <AlignLeft className="w-5 h-5 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-1.5" role="label">Description</p>
        {isEditing ? (
        <form className="space-y-2" ref={formRef} action={onSubmit}>  
          <FormTextarea 
            ref={textareaRef}
            id="description" 
            placeholder="Enter a card description..."
            defaultValue={description || ""}
            autoFocus
            errors={fieldErrors}
          />
          <div className="space-x-2">
            <FormSubmit size="sm">Save</FormSubmit>
            <Button 
              className="border border-neutral-300 hover:bg-neutral-200" 
              size="sm" 
              variant="ghost"
              onClick={onDisableEditing}
            >
              Cancel
            </Button>
          </div>
        </form>
        ) : (
          <div 
            className="w-full h-20 rounded-md bg-neutral-200 p-2.5 text-sm font-medium overflow-hidden" 
            role="button"
            onClick={onEnableEditing}
          >
            {description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  )
}




CardModalDescription.Skeleton = function() {
  return (
    <div className="w-full flex items-start gap-3">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-32 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-20 mb-2 bg-neutral-200" />
      </div>
    </div>
  )
}