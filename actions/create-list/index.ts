"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { createListSchema } from "./schema"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { title, boardId } = data


  // Try to create a list in the database
  let newList
  
  try {
    // First check board still exists
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId
      },
      // select: {
      //   lists: true
      // }
    })

    // Return error if board could not be found
    if (!board) return { error: "Failed to create list. Could not find the Board" }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: { order: "desc" },
      select: { order: true }
    })

    const orderValue = lastList ? lastList.order + 1 : 1

    newList = await db.list.create({
      data: {
        title,
        boardId,
        order: orderValue
        // order: board?.lists.length
      }
    });

    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST, 
      entityId: newList.id, 
      entityTitle: newList.title
    })
    
  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to create list."
    }
  }

  // On succesful create in Database, revalidate the path and return data
  revalidatePath(`/board/${boardId}`);
  return {
    data: newList
  }
}

export const createList = createSafeAction(createListSchema, handler)