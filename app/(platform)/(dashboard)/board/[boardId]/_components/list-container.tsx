"use client"

import { ListWithCards } from "@/types/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

type Props = {
  boardId: string;
  lists: ListWithCards[]
}

export const ListContainer = ({ boardId, lists }: Props) => {
  // Local source of truth (for better drag & drop experience)
  const [orderedListData, setOrderedListData] = useState(lists)

  // Keep listData and lists in sync
  useEffect(() => {
    setOrderedListData(lists)
  }, [lists])

  return (
    <ol className="flex h-full gap-3">
      {orderedListData.map((list, idx) => (
        <ListItem key={list.id} index={idx} data={list} />
      ))}
      <ListForm />
      {/* Spacer div */}
      <div className="w-1 flex-shrink-0" />
    </ol>
  )
}