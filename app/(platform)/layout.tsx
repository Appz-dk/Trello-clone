import { ClerkProvider } from "@clerk/nextjs"

type Props = {
  children: React.ReactNode
}

const PlatformLayout: React.FC<Props> = ({ children }) => {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout