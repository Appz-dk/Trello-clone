import { z } from "zod"
import { Board } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"
import { boardSchema } from "./schema"

export type InputType = z.infer<typeof boardSchema>
export type ReturnType = ActionState<InputType, Board>