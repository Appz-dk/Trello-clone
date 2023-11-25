"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { updateListSchema } from "./schema"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { title, boardId, id } = data


  // Try to update the list in the database
  let updatedList
  
  try {
    updatedList = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
      data: {
        title,
      }
    });

    await createAuditLog({
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.LIST, 
      entityId: updatedList.id, 
      entityTitle: updatedList.title
    })

  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to update list title."
    }
  }

  // On succesful update in Database, revalidate the path and return data
  revalidatePath(`/board/${boardId}`);
  return {
    data: updatedList
  }
}

export const updateList = createSafeAction(updateListSchema, handler)