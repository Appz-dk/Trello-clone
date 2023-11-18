import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

type Props = {
  children: React.ReactNode
}

const PlatformLayout: React.FC<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout