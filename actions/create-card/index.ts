"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { createCardSchema } from "./schema"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { title, listId, boardId } = data



  // Try to create a list in the database
  let newCard
  
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        boardId,
        board: {
          orgId
        }
      },
      include: {
        cards: {
          orderBy: {
            order: "desc"
          },
          select: {
            order: true
          }
        }
      }
    })

    if (!list) return { error: "Failed to create card. Could not find parent list" }

    const newOrderValue = list.cards.length ? list.cards[0].order + 1 : 1

    newCard = await db.card.create({
      data: {
        title,
        listId,
        order: newOrderValue
      }
    })
  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to create card."
    }
  }

  // On succesful create in Database, revalidate the path and return data
  revalidatePath(`/board/${boardId}`);
  return {
    data: newCard
  }
}

export const createCard = createSafeAction(createCardSchema, handler)