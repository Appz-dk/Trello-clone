import { z } from "zod"
import { Card } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"
import { updateCardOrderSchema } from "./schema"

export type InputType = z.infer<typeof updateCardOrderSchema>
export type ReturnType = ActionState<InputType, Card[]>