"use client"

import { toast } from "sonner"
import { ElementRef, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Layout } from "lucide-react"
import { useParams } from "next/navigation"

import { useAction } from "@/hooks/use-action"
import { updateCard } from "@/actions/update-card"

import { FormInput } from "@/components/form/form-input"
import { CardWithList } from "@/types/types"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  data: CardWithList
}

export const CardModalHeader = ({ data }: Props) => {
  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({queryKey: ["card", data.id]})
      toast.success(`Renamed card to "${data.title}"`)
      setTitle(title)
    },
    onError(error) {
      toast.error(error)
    },
  })

  const inputRef = useRef<ElementRef<"input">>(null)
  const queryClient = useQueryClient()
  const params = useParams()
  const [title, setTitle] = useState(data.title)

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title")?.toString().trim() as string
    const boardId = params.boardId as string

    if (title === data.title) return

    execute({id: data.id, title, boardId })
  }

  return (
    <div className="flex flex-col gap-1 items-start mb-4 w-full">
      <div className="flex items-center w-full gap-x-1">
        <Layout className="w-5 h-5 text-neutral-700" />
        <form className="w-full" action={onSubmit}>
          <FormInput 
            ref={inputRef}
            className="truncate w-[90%] text-lg font-semibold text-neutral-700 px-1 border-none focus-visible:ring-offset-0"
            id="title"
            defaultValue={title}
            onBlur={onBlur}
            errors={fieldErrors}
            />
        </form>
      </div>
      <p className="ml-[24px] px-1 text-sm text-muted-foreground line-clamp-1">
        In list <span className="underline">{data.list.title}</span>
      </p>
    </div>
  )
}

CardModalHeader.Skeleton = function() {
  return (
    <div className="flex items-start gap-2 mb-2 w-full">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div>
        <Skeleton className="w-40 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-12 h-4 bg-neutral-200" />
      </div>
    </div>
  )
}