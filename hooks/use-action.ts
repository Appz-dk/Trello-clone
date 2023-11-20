import { useState, useCallback } from "react";

import { ActionState, FieldErrors } from "@/lib/create-safe-action";

// TInput is the expected schema created with zod
// TOutput is schema created in Prisma (The return value prisma will give back)
type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>

interface useActionOptions<TOutput, TInput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: (fieldErrors?: FieldErrors<TInput> ) => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: useActionOptions<TOutput, TInput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(async (input: TInput) => {
    setIsLoading(true)
    setFieldErrors(undefined) // Reset field errors on retry
    let tempFieldErrors = undefined;

    try {
      const res = await action(input)

      if (!res) return

      // Input error
      if (res.fieldErrors) {
        setFieldErrors(res.fieldErrors)
        tempFieldErrors = res.fieldErrors
      }

      // Server error
      if (res.error) {
        setError(res.error)
        options?.onError?.(res.error)
      }

      // Result data
      if (res.data) {
        setData(res.data)
        options?.onSuccess?.(res.data)
      }
    } finally {
      setIsLoading(false)
      options?.onComplete?.(tempFieldErrors)
    }
  }, [action, options])


  return {
    execute,
    isLoading,
    fieldErrors,
    data,
    error
  }
}