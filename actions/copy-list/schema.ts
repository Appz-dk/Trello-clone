import { z } from "zod"

export const copyListSchema = z.object({
  id: z.string(),
  boardId: z.string(),
})