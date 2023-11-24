import { useState } from "react";

import { Draggable, Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { ListWithCards } from "@/types/types";
import { ListWrapper } from "./list-wrapper";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";

type Props = {
  data: ListWithCards;
  index: number;
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
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <ListWrapper 
          ref={provided.innerRef} 
          {...provided.draggableProps}
        >
          <div 
            className="bg-[#f1f2f4] rounded-md w-full p-2 shadow-md" 
            {...provided.dragHandleProps}
          >
            <ListHeader data={data} onAddCard={onEnableEditing} />
            {/* List cards */}
            <Droppable droppableId={data.id} type="card">
              {provided => (
                <ol 
                  className={cn("flex flex-col gap-2 text-sm py-0.5", data.cards.length > 0 && "mt-2")}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {data.cards.map((card, idx) => (
                    <CardItem key={card.id} card={card} index={idx} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm 
              listId={data.id} 
              isEditing={isEditing} 
              onEnableEditing={onEnableEditing} 
              onDisableEditing={onDisableEditing} 
              />
          </div>
        </ListWrapper>  
      )}
    </Draggable>
  )
}