import { z } from "zod"

export const deleteListSchema = z.object({
  id: z.string(),
  boardId: z.string(),
})