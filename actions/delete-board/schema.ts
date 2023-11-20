import { z } from "zod"

export const deleteBoardSchema = z.object({
  id: z.string()
})