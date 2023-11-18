"use client"

import { createBoard } from "@/actions/create-board"
import { useAction } from "@/hooks/use-action"

import { FormSubmit } from "@/components/form/form-submit"
import { FormInput } from "@/components/form/form-input"

export const Form = () => {
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
      <FormInput label="Title" id="title" errors={fieldErrors} />
      <FormSubmit>
        Submit
      </FormSubmit>
    </form>
  )
}