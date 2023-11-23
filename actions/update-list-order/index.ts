"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { updateListOrderSchema } from "./schema"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { items, boardId } = data

  // Try to create a list in the database
  let updatedLists
  
  try {
    const transaction = items.map(list => {
      return db.list.update({
        where: {
          id: list.id,
          boardId,
          board: {
            orgId
          }
        },
        data: { order: list.order }
      })
    })

    updatedLists = await db.$transaction(transaction)
  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to reorder lists."
    }
  }

  // On succesful create in Database, revalidate the path and return data
  revalidatePath(`/board/${boardId}`);
  return {
    data: updatedLists
  }
}

export const updateListOrder = createSafeAction(updateListOrderSchema, handler)