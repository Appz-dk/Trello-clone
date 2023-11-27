import { z } from "zod"

import { ActionState } from "@/lib/create-safe-action"
import { stripeRedirectSchema } from "./schema"

export type InputType = z.infer<typeof stripeRedirectSchema>
export type ReturnType = ActionState<InputType, string>