import { z } from "zod"

export const updateCardSchema = z.object({
  id: z.string(),
  boardId: z.string(),
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required"
  }).min(2, {
    message: "Title should be min 2 chars"
  }),
  description: z.optional(z.string().min(3, {
    message: "Description is too short - min 3 characters"
  })),
})