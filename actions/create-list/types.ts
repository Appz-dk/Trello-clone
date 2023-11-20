import { z } from "zod"
import { List } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"
import { createListSchema } from "./schema"

export type InputType = z.infer<typeof createListSchema>
export type ReturnType = ActionState<InputType, List>