import { ElementRef, useRef, KeyboardEventHandler } from "react";
import { useParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";

import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button"
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type Props = {
  listId: string;
  isEditing: boolean;
  onEnableEditing: () => void;
  onDisableEditing: () => void;
}

export const CardForm = ({ isEditing, listId, onDisableEditing, onEnableEditing }: Props) => {
  const params = useParams()
  const formRef = useRef<ElementRef<"form">>(null)
  const { execute, fieldErrors} = useAction(createCard, {
    onSuccess(data) {
      toast.success(`Card "${data.title}" created`)
      formRef.current?.reset()
    },
    onError(error) {
      toast.error(error)
    },
  })

  useOnClickOutside(formRef, onDisableEditing)
  useEventListener("keydown", e => {
    if (e.code === "Escape") onDisableEditing()
  })

  const onTextareaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    // Submit form if user press enter while not holding shiftKey
    if (e.code === "Enter" && !e.shiftKey) {
      formRef.current?.requestSubmit()
    }
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title")?.toString().trim() as string
    const listId = formData.get("list-id")?.toString().trim() as string
    const boardId = params.boardId as string

    console.log("Creating card", {title, listId, boardId})
    execute({ title, listId, boardId })
  }
  
  if (isEditing) {
    return (
      <form action={onSubmit} ref={formRef} className="m-1 mt-4 space-y-3">
        <FormTextarea 
          id="title"
          autoFocus
          placeholder="Enter a title for this card..."
          onKeyDown={onTextareaKeydown}
          errors={fieldErrors} 
        />
        <input className="hidden" id="list-id" name="list-id" value={listId} readOnly />
        <div className="flex items-center gap-2">
          <FormSubmit size="sm" className="text-sm">
            Add Card
          </FormSubmit>
          <Button className="hover:bg-neutral-300" type="button" size="sm" variant="ghost" onClick={onDisableEditing}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="mt-2">
      <Button 
        className="w-full h-auto justify-start gap-2 text-sm p-2 text-muted-foreground" 
        size="sm" 
        variant="ghost"
        onClick={onEnableEditing}
      >
        <Plus className="w-4 h-4" />
        Add a Card
      </Button>
    </div>
  )
}