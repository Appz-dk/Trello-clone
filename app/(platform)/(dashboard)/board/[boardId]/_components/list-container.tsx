"use client"

import { ListWithCards } from "@/types/types";
import { ListForm } from "./list-form";

type Props = {
  boardId: string;
  lists: ListWithCards[]
}

export const ListContainer = ({ boardId, lists }: Props) => {
  return (
    <ol className="">
      <ListForm />
      <div className="w-1 flex-shrink-0" />
    </ol>
  )
}