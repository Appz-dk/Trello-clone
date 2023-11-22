import { z } from "zod"

export const updateListSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required"
  }).min(2, {
    message: "Title should be min 2 chars"
  }),
  boardId: z.string(),
  id: z.string()
})