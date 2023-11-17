"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export const FormSubmit = () => {
  const {pending} = useFormStatus()
  return (
    <Button disabled={pending} type="submit" className="ml-2">Submit</Button>
  )
}