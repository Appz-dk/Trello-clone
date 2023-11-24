import { useCardModal } from "@/hooks/use-card-modal";
import { Draggable } from "@hello-pangea/dnd";

import { Card } from "@prisma/client";

type Props = {
  index: number;
  card: Card
}

export const CardItem = ({ card, index }: Props) => {
  const { onOpen } = useCardModal(state => state)
  return (
    <Draggable draggableId={card.id} index={index}>
      {provided => (
        <div 
          className="text-sm shadow-md rounded-md truncate bg-white p-2 border-2 border-transparent hover:border-black" 
          role="button"
          onClick={() => onOpen(card.id)}
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