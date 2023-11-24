"use client"

import { useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

type Props = {
  children: React.ReactNode
}
export const QueryProvider = ( {children}: Props) => {
  const [queryClient] = useState(new QueryClient())
    
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}