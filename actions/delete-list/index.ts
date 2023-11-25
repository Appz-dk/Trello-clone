"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { deleteListSchema } from "./schema"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { id, boardId } = data


  // Try to create a board in the database
  let deletedList
  
  try {
    deletedList = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
    });

    await createAuditLog({
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.LIST, 
      entityId: deletedList.id, 
      entityTitle: deletedList.title
    })

  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to delete board."
    }
  }

  // On succes, revalidate the path
  revalidatePath(`/board/${boardId}`);

  return {
    data: deletedList
  }
}

export const deleteList = createSafeAction(deleteListSchema, handler)