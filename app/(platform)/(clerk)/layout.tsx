type Props = {
  children: React.ReactNode
}

const ClerkLayout: React.FC<Props> = ({children}) => {
  return (
    <div className="h-full grid place-items-center">
      {children}
    </div>
  )
}

export default ClerkLayout