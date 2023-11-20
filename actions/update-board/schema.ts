import { z } from "zod"

export const updateBoardSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required"
  }).min(3, {
    message: "Title should be min 3 chars"
  }),
  id: z.string()
})