import { z } from "zod"

export const boardSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required"
  }).min(3, {
    message: "Title should be min 3 chars"
  }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required"
  })
})



export const imageSchema = z.object({
  imageId: z.string({
    required_error: "Image id is required, but is missing",
    invalid_type_error: "Image id is required, but is missing"
  }),
  imageThumbUrl: z.string({
    required_error: "Image thumb url is required, but is missing",
    invalid_type_error: "Image thumb url is required, but is missing"
  }),
  imageFullUrl: z.string({
    required_error: "Image full url is required, but is missing",
    invalid_type_error: "Image full url is required, but is missing"
  }),
  imageLinkHTML: z.string({
    required_error: "Image HTML link is required, but is missing",
    invalid_type_error: "Image HTML link is required, but is missing"
  }),
  imageUserName: z.string({
    required_error: "Image username is required, but is missing",
    invalid_type_error: "Image username is required, but is missing"
  }),
})