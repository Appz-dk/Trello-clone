"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { ImageData, InputType, ReturnType } from "./types"
import { boardSchema, imageSchema } from "./schema"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return {error: "Unauthorized"}

  const { title, image } = data
  const formattedImageData = JSON.parse(image) as ImageData

  // Validate image format
  const imageValidationResult = imageSchema.safeParse(formattedImageData)
  if(!imageValidationResult.success) {
    return {
      // TODO: Could improve this error message (will just highlight the first issue)
      error: imageValidationResult.error.issues[0].message,
    }
  }

  // Try to create a board in the database
  let board
  
  try {
    board = await db.board.create({
      data: {
        orgId: orgId,
        title,
        ...formattedImageData,
      }
    })

    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.BOARD, 
      entityId: board.id, 
      entityTitle: board.title
    })

  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to create."
    }
  }

  // On succesful create in Database, revalidate the path and return data
  revalidatePath(`/boards/${board.id}`)
  return {
    data: board
  }
}

export const createBoard = createSafeAction(boardSchema, handler)