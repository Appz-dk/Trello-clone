import { z } from "zod"

export const deleteCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  listId: z.string(),
})