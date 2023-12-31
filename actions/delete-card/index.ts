"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { deleteCardSchema } from "./schema"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { id, boardId, listId } = data


  // Try to copy a card from the database
  let deletedCard
  
  try {
    deletedCard = await db.card.delete({
      where: {
        id,
        listId,
        list: {
          board: {
            orgId
          }
        }
      }
    })

    await createAuditLog({
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.CARD, 
      entityId: deletedCard.id, 
      entityTitle: deletedCard.title
    })
    
  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to delete card."
    }
  }

  // On succes, revalidate the path
  revalidatePath(`/board/${boardId}`);

  return {
    data: deletedCard
  }
}

export const deleteCard = createSafeAction(deleteCardSchema, handler)