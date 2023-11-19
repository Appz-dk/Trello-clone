import { startCase } from "lodash"

import { OrgControl } from "./_components/org-control"
import { auth } from "@clerk/nextjs"

type Props = {
  children: React.ReactNode
}

export async function generateMetadata() {
  const { orgSlug } = auth()
  return {
    title: startCase(orgSlug || "organization")
  };
};

const OrganizationIdLayout: React.FC<Props> = ({children}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  )
}

export default OrganizationIdLayout