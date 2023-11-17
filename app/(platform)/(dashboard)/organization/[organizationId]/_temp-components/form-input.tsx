"use client"

import { createBoard } from "@/actions/createBoard"
import { useFormState } from "react-dom"
import { FormSubmit } from "./form-submit"

export const FormInput = () => {
  const initialFormState = {
    message: "",
    errors: {}
  }
  const [formState, dispatch] = useFormState(createBoard, initialFormState)
  const titleError = formState?.errors?.title

  return (
    <form action={dispatch}>
      {titleError?.length && (
        <div>
          {titleError.map(error => (
            <p key={error} className="text-rose-500">{error}</p>
          ))}
        </div>
      )}
      <input id="title" name="title" placeholder="Enter title" className="border border-input p-1"/>
      <FormSubmit />
    </form>
  )
}