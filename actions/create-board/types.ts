import { z } from "zod"
import { Board } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"
import { boardSchema, imageSchema } from "./schema"

export type InputType = z.infer<typeof boardSchema>
export type ReturnType = ActionState<InputType, Board>

export type ImageData = z.infer<typeof imageSchema>