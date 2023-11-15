type Props = {
  children: React.ReactNode
}

const OrganizationLayout: React.FC<Props> = ({children}) => {
  return (
    <main className="mx-auto pt-20 md:pt-24 px-4 max-w-6xl xl:max-w-screen-xl">
      <div className="flex gap-7">
        <div className="w-64 shrink-0 hidden md:block">
          {/* TODO: add sidebar */}
        </div>

      {children}
      </div>
    </main>
  )
}

export default OrganizationLayout