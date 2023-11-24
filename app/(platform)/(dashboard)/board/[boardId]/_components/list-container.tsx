"use client"

import { toast } from "sonner";
import { DragDropContext, Droppable, OnDragEndResponder  } from "@hello-pangea/dnd"

import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

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
  const [orderedListsData, setOrderedListsData] = useState(lists)

  const {execute: executeUpdateListOrder } = useAction(updateListOrder, {
    // onSuccess() {
    //   toast.success("Lists reordered")
    // },
    onError(error) {
      toast.error(error)
    },
  })

  const {execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    // onSuccess() {
    //   toast.success("Cards reordered")
    // },
    onError(error) {
      toast.error(error)
    },
  })

  // Keep listData and lists in sync
  useEffect(() => {
    setOrderedListsData(lists)
  }, [lists])

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, type, source, draggableId } = result

    if (!destination) return
    const listCopy = [...orderedListsData]
    const startIndex = source.index
    const endIndex = destination?.index

    // if dropped in same location
    if (startIndex === endIndex && destination.droppableId === source.droppableId) return

    // If user moves a list
    if (type === "list") {
      const newListsData = reorderHelper(listCopy, startIndex, endIndex)
      setOrderedListsData(newListsData)
      // Execute server action to keep db in sync
      executeUpdateListOrder({items: newListsData, boardId})
    }

    // If user moves a card
    if (type === "card") {
      const sourceList = listCopy.find(l => l.id === source.droppableId)
      const destinationList = listCopy.find(l => l.id === destination.droppableId)

      if (!sourceList || !destinationList) return

      // User reorders card in the same list
      if (source.droppableId === destination.droppableId) {
        const sourceListWithUpdatedCards = {...sourceList, cards: reorderHelper(sourceList.cards, startIndex, endIndex)}
        const newListsData = listCopy.map(list => list.id === sourceList.id ? sourceListWithUpdatedCards : list)
        setOrderedListsData(newListsData)
        // Execute server action to keep db in sync
        executeUpdateCardOrder({items: sourceListWithUpdatedCards.cards, boardId})
      }

      // User moves card from one list to another list
      if (source.droppableId !== destination.droppableId) {
        const cardToMove = sourceList.cards.find(c => c.id === draggableId)
        if (!cardToMove) return

        // Update listId of cardToMove
        cardToMove.listId = destinationList.id

        // Remove the card to move from the source list & update all cards order value
        const newSourceListCards = sourceList.cards.filter(c => c.id !== draggableId).map((c, idx) => ({...c, order: idx}))

        const sourceListWithUpdatedCards = {
          ...sourceList, 
          cards: newSourceListCards
        }

        // Add the card to move to the destination list & reorder the cards
        const destListWithUpdatedCards = {
          ...destinationList, 
          cards: reorderItems(destinationList.cards, cardToMove, destination.index)
        }

        // Update previous state to new state
        const newListsData = listCopy.map(list => {
          if (list.id === sourceList.id) return sourceListWithUpdatedCards
          if (list.id === destinationList.id) return destListWithUpdatedCards
          return list
        })
        setOrderedListsData(newListsData)
        // Execute server action to keep db in sync (Not necesary to also sync source list)
        executeUpdateCardOrder({items: destListWithUpdatedCards.cards, boardId})
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {provided => (
          <ol 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex h-full gap-3"
          >
            {orderedListsData.map((list, idx) => (
              <ListItem key={list.id} index={idx} data={list} />
            ))}
            {provided.placeholder}

            <ListForm />
            {/* Spacer div */}
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

function reorderHelper<T>(list: T[], sourceIndex: number, destinationIndex: number) {
  if (!list.length) return list
  const copy = [...list]
  const [removed] = copy.splice(sourceIndex, 1)
  // Reorder the copyied items and update the order value to the new indexes
  return reorderItems(copy, removed, destinationIndex)
}

function reorderItems<T>(list: T[], itemToAdd: T, destinationIndex: number) {
  // Inserts the item to add and maps their order value to the new index of the array
  return [...list.slice(0, destinationIndex), itemToAdd, ...list.slice(destinationIndex)].map((item, index) => ({...item, order: index}));
}