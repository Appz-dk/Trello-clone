import { z } from "zod"
import { Card } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"
import { createCardSchema } from "./schema"

export type InputType = z.infer<typeof createCardSchema>
export type ReturnType = ActionState<InputType, Card>