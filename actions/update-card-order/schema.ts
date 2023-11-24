import { z } from "zod"

export const updateCardOrderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      order: z.number(),
      description: z.string().nullable(),
      listId: z.string()
    })
  ),
  boardId: z.string(),
})