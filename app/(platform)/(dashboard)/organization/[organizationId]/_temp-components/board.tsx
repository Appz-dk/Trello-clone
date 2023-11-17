"use client"

import { deleteBoard } from "@/actions/deleteBoard";
import { useFormStatus } from "react-dom";
import { FormDelete } from "./form-delete";

type Props = {
  id: string;
  title: string;
}

export const Board = ({ title, id }: Props) => {
  const deleteBoardWithId = deleteBoard.bind(null, id)

  const { pending } = useFormStatus()
  return (
    <form action={deleteBoardWithId} className="flex gap-2 items-center">
      <p>Board title: {title}</p>
      <FormDelete />
    </form>
  )
}