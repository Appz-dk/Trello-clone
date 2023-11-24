import { Droppable, Draggable } from "@hello-pangea/dnd";

import { Card } from "@prisma/client";

type Props = {
  index: number;
  card: Card
}

export const CardItem = ({ card, index }: Props) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <div 
          className="text-sm shadow-md rounded-md truncate bg-white p-2 border-2 border-transparent hover:border-black" 
          role="button"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}