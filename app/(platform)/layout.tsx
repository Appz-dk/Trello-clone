import { ModalProvider } from "@/components/providers/modal-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

type Props = {
  children: React.ReactNode
}

const PlatformLayout: React.FC<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <ModalProvider />
        <Toaster />
        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}

export default PlatformLayout