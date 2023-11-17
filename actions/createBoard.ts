"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const boardSchema = z.object({
  title: z.string(),
})

export const createBoard = async (formData: FormData) => {

  const { title } = boardSchema.parse({
    title: formData.get("title")
  })
  

  await db.board.create({
    data: {
      title
    }
  })

  revalidatePath("/organization/org_2YDIZMLl9TpsRQAvjW0xFH4udSU")
}