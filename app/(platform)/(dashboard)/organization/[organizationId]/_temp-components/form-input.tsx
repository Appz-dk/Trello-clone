"use client"

import { createBoard } from "@/actions/create-board"
import { FormSubmit } from "./form-submit"
import { useAction } from "@/hooks/use-action"

export const FormInput = () => {
  const {execute, fieldErrors} = useAction(createBoard, {
    onSucces: (data) => {
      console.log("Success!!", data)
    },
    onComplete: () => {
      "Form is complete!"
    },
    onError: (error) => {
      console.log("FORM ERROR!", error)
    }
  })

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string
    await execute({title})
  }

  return (
    <form action={onSubmit}>
      {fieldErrors?.title && (
        <div>
          {fieldErrors?.title.map(error => (
            <p key={error} className="text-rose-500">{error}</p>
          ))}
        </div>
      )}
      <input id="title" name="title" placeholder="Enter title" className="border border-input p-1"/>
      <FormSubmit />
    </form>
  )
}