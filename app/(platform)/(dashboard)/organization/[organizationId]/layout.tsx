import { OrgControl } from "./_components/org-control"

type Props = {
  children: React.ReactNode
}

const OrganizationIdLayout: React.FC<Props> = ({children}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}

export default OrganizationIdLayout