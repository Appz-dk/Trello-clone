"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { updateCardSchema } from "./schema"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { id, boardId, ...values} = data



  // Try to create a list in the database
  let updatedCard
  
  try {
    updatedCard = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId
          }
        }
      },
      data: {
        ...values
      }
    })

    await createAuditLog({
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.CARD, 
      entityId: updatedCard.id, 
      entityTitle: updatedCard.title
    })

  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to update card."
    }
  }

  // On succesful create in Database, revalidate the path and return data
  revalidatePath(`/board/${boardId}`);
  return {
    data: updatedCard
  }
}

export const updateCard = createSafeAction(updateCardSchema, handler)