"use server"

import { auth } from "@clerk/nextjs"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { createSafeAction } from "@/lib/create-safe-action"

import { InputType, ReturnType } from "./types"
import { deleteBoardSchema } from "./schema"
import { redirect } from "next/navigation"



const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  // Check user is authenticated 
  if (!userId || !orgId) return { error: "Unauthorized" }

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