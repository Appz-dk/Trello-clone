"use client"

import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button"

type Props = {
  id: string;
  title: string;
}

export const Board = ({ title, id }: Props) => {
  const deleteBoardWithId = deleteBoard.bind(null, id)
  return (
    <form action={deleteBoardWithId} className="flex gap-2 items-center">
        <p>Board title: {title}</p>
        <Button variant="destructive" size="sm">Delete</Button>
    </form>
  )
}