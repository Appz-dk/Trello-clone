"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"
import { decrementBoardsCount } from "@/lib/org-limit"

import { InputType, ReturnType } from "./types"
import { deleteBoardSchema } from "./schema"
import { redirect } from "next/navigation"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) {
    return {error: "Unauthorized"}
  }

  const { id } = data


  // Try to create a board in the database
  let deletedBoard
  
  try {
    deletedBoard = await db.board.delete({
      where: {
        id,
        orgId
      },
    });

    await createAuditLog({
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.BOARD, 
      entityId: deletedBoard.id, 
      entityTitle: deletedBoard.title
    })

    await decrementBoardsCount()
    
  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to delete board."
    }
  }

  // On succesful create in Database, revalidate the path and return data
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(deleteBoardSchema, handler)