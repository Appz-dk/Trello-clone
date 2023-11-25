"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { copyCardSchema } from "./schema"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { id, boardId } = data


  // Try to copy a card from the database
  let cardCopy
  
  try {
    // Get card to copy
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId
          }
        }
      },
    });

    if (!cardToCopy) return { error: "Database Error - Failed to copy, card not found" }

    const lastCardOrder = await db.card.findFirst({
      where: {
        list: {
          id: cardToCopy.listId
        }
      },
      orderBy: {
        order: "desc"
      },
      select: {
        order: true
      }
    })

    // Calc next order value
    const nextOrderValue = lastCardOrder ? lastCardOrder.order + 1 : 1

    // Create a copy of the card
    cardCopy = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        listId: cardToCopy.listId,
        order: nextOrderValue
      }
    })

  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to copy card."
    }
  }

  // On succes, revalidate the path
  revalidatePath(`/board/${boardId}`);

  return {
    data: cardCopy
  }
}

export const copyCard = createSafeAction(copyCardSchema, handler)