import { z } from "zod"

export const updateListOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      order: z.number()
    })
  ),
  boardId: z.string()
})