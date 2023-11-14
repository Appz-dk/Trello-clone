type TProps = {
  children: React.ReactNode
}

const MarketingLayout: React.FC<TProps> = ({children}) => {
  return (
    <div className="h-full bg-slate-100">
      {/* TODO: Add Navbar */}
      <main className="pt-40 pb-20 bg-slate-100">
        {children}
      </main>
      {/* TODO: Add Footer */}
    </div>
  )
}

export default MarketingLayout