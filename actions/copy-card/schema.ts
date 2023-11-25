import { z } from "zod"

export const copyCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
})