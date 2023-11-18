"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { boardSchema } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()

  // Check user is authenticated 
  if (!userId) return {error: "Unauthorized"}

  const { title } = data

  // Try to create a board in the database
  let board
  
  try {
    board = await db.board.create({
      data: {
        title
      }
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