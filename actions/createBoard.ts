"use server"

import { db } from "@/lib/db"
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
}