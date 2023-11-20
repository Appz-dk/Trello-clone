"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { updateBoardSchema } from "./schema"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { title, id } = data


  // Try to create a board in the database
  let updatedBoard
  
  try {
    updatedBoard = await db.board.update({
      where: {
        id,
        orgId
      },
      data: {
        title
      }
    });
  } catch (error) {
    // Incase of error return error message
    return {
      error: "Database Error - Failed to update board."
    }
  }

  // On succesful create in Database, revalidate the path and return data
  revalidatePath(`/board/${id}`);
  return {
    data: updatedBoard
  }
}

export const updateBoard = createSafeAction(updateBoardSchema, handler)