  "use client"

  import { useLocalStorage } from "usehooks-ts"
  import { useOrganization, useOrganizationList } from "@clerk/nextjs"
  import Link from "next/link"
  import { Plus } from "lucide-react"
  import { useHasMounted } from "@/hooks/useHasMounted"

  import { Accordion } from "@/components/ui/accordion"
  import { Button } from "@/components/ui/button"
  import { Skeleton } from "@/components/ui/skeleton"

  import { NavItem } from "./nav-item"

  type Props = {
    storageKey?: string
  }

  export const Sidebar: React.FC<Props> = ({ storageKey = "t-sidebar-state" }) => {
    // const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(storageKey, {})
    const { organization: activeOrg, isLoaded: isLoadedOrg } = useOrganization()
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
      userMemberships: {
        infinite: true
      }
    })


    // Amazing Read!
    // https://medium.com/@mohit-vaswani/hydration-failed-in-next-js-what-it-is-and-how-to-fix-it-e566e15b680e
    // This component has to be client side only due to hydrations issues
    const { hasMounted } = useHasMounted()
    if (!hasMounted) {
      return null;
    }

    // const defaultAccordianValue = Object.keys(expanded).reduce((acc: string[], key: string) => {
    //   // If the current key is expanded push it to the accumulator
    //   if (expanded[key]) acc.push(key)
    //   return acc
    // }, [])

    // const onExpand = (id: string) => {
    //   setExpanded(prev => {
    //     return {
    //       ...prev,
    //       [id]: !prev[id]
    //     }
    //   })
    // }

    // Loading State
    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
      return (
        <>
          <div className="flex flex-col gap-2 pl-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-[50%] h-10" />
              <Skeleton className="w-10 h-10"/>
            </div>
            <div className="space-y-2">
              <NavItem.Skeleton />
              <NavItem.Skeleton />
              <NavItem.Skeleton />
              <NavItem.Skeleton />
            </div>
          </div>
        </>
      )
    }

    return (
      <>
        {/* <div className="flex flex-col gap-2 pl-4">
          <div className="text-sm font-medium flex items-center justify-between">
            <span>Workspaces</span>
            <Button size="icon" type="button" variant="ghost" asChild>
              <Link href="/select-org">
                <Plus className="h-4 w-4"/>
              </Link>
            </Button>
          </div>
          <Accordion
            type="multiple"
            defaultValue={defaultAccordianValue}
            className="space-y-2"
            >
            {userMemberships.data.map(({ organization }) => (
              <NavItem 
              key={organization.id} 
              isActive={organization.id === activeOrg?.id} 
              isExpanded={expanded[organization.id]} 
              organization={organization}
              onExpand={onExpand}
              />
              ))}
          </Accordion>
        </div> */}
      </>
    )
  }