import { z } from "zod"

export const createCardSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required"
  }).min(2, {
    message: "Title should be min 2 chars"
  }),
  listId: z.string(),
  boardId: z.string(),
})