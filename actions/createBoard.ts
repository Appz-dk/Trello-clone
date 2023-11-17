"use server"

import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export type InputState = {
  errors?: {
    title?: string[]
  }
  message?: null | string;
}

const boardSchema = z.object({
  title: z.string().min(3, {
    message: "Title has to be min 3 characters long"
  }),
})

export const createBoard = async (prevState: InputState, formData: FormData) => {

  const validatedInput = boardSchema.safeParse({
    title: formData.get("title")
  })

  if (!validatedInput.success) {
    return {
      errors: validatedInput.error.flatten().fieldErrors,
      message: "Missing fields."
    }
  }
  
  const { title } = validatedInput.data

  try {
    await db.board.create({
      data: {
        title
      }
    })
  } catch (error) {
    return {
      message: "Database error"
    }
  }

  revalidatePath("/organization/org_2YDIZMLl9TpsRQAvjW0xFH4udSU")
  redirect("/organization/org_2YDIZMLl9TpsRQAvjW0xFH4udSU")
}