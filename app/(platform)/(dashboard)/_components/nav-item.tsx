import { useRouter, usePathname} from "next/navigation"
import Image from "next/image";
import { Activity, Settings, CreditCard, Layout } from "lucide-react"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizationList } from "@clerk/nextjs";

export type TOrganization = {
  id: string;
  name: string;
  slug: string | null;
  imageUrl: string;
}

type Props = {
  isActive: boolean;
  isExpanded: boolean;
  organization: TOrganization
  onExpand: (id: string) => void
}

export const NavItem = ({isActive, isExpanded, organization, onExpand} : Props) => {
  const { setActive } = useOrganizationList()
  const router = useRouter()
  const pathname = usePathname()

  const baseRoute = `/organization/${organization.id}`
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="w-4 h-4" />,
      href: baseRoute
    },
    {
      label: "Activity",
      icon: <Activity className="w-4 h-4" />,
      href: baseRoute + "/activity"
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      href: baseRoute + "/settings"
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-4 h-4" />,
      href: baseRoute + "/billing"
    },
  ]

  const onRouteChange = async (href: string) => {
    // this bug has haunted me for hours!... The previous organization data was being shown for a breif second after React Suspense
    // Because the organization ID was not updated
    await setActive?.({organization: organization.id})
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
        <AccordionTrigger 
          onClick={() => onExpand(organization.id)}
          className={cn(
            "no-underline text-sm font-medium flex items-center justify-between p-1.5 rounded-md text-neutral-700 transition hover:no-underline hover:bg-neutral-500/10",
            isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
            )}
        >
          <div className="flex items-center gap-2">
            <Image src={organization.imageUrl} width={28} height={28} priority alt="Organization logo" className="rounded-sm"/>
            <span>
              {organization.name}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1 text-neutral-700">
            {routes.map(route => (
              <Button
                key={route.href} 
                size="sm" 
                variant="ghost"
                className={cn(
                  "w-full pl-10 flex justify-start items-center gap-2 font-normal",
                  pathname === route.href && "bg-sky-500/10 text-sky-700 font-medium"
                )}
                onClick={() => onRouteChange(route.href)}
              >
                {route.icon}
                <span>{route.label}</span>
              </Button>
            ))}
        </AccordionContent>
    </AccordionItem>
  )
}


NavItem.Skeleton = function NavItemSkeleton () {
  return (
    <div className="pt-1 flex gap-2 items-center">
      <div className="w-10 h-10 shrink-0">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}