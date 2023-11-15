"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useOrganizationList } from "@clerk/nextjs"

// This component only controls which organization is currently active.
// it will update the active organization when the /organizationId changes in the url.

export const OrgControl = () => {
  const { organizationId } = useParams()
  const { setActive } = useOrganizationList()

  useEffect(() => {
    if (!organizationId || !setActive || typeof organizationId !== "string") return
    setActive({
      organization: organizationId
    })
  }, [setActive, organizationId])

  return null
}