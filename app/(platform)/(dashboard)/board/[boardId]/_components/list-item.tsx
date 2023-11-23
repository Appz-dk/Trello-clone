import { useState } from "react";

import { ListWithCards } from "@/types/types";
import { ListWrapper } from "./list-wrapper";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";

type Props = {
  data: ListWithCards;
  index: Number;
}

export const ListItem = ({ data, index }: Props) => {
  const [isEditing, setIsEditing ] = useState(false)

  const onEnableEditing = () => {
    setIsEditing(true)
  }

  const onDisableEditing = () => {
    setIsEditing(false)
  }

  return (
    <ListWrapper>
      <div className="bg-[#f1f2f4] rounded-md w-full p-2 shadow-md">
        <ListHeader data={data} onAddCard={onEnableEditing} />
        <CardForm 
          listId={data.id} 
          isEditing={isEditing} 
          onEnableEditing={onEnableEditing} 
          onDisableEditing={onDisableEditing} 
        />
      </div>
    </ListWrapper>  
  )
}