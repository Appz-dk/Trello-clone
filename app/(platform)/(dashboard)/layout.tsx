import { Navbar } from "./_components/navbar"

type Props = {
  children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({children}) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  )
}

export default DashboardLayout