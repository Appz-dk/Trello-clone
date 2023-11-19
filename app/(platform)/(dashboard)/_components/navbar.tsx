import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { MobileSidebar } from "./mobile-sidebar"
import { FormPopover } from "@/components/form/form-popover"

export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 h-14 w-full px-4 bg-white flex items-center justify-between border-b shadow-sm">
      <div className="flex gap-4 items-center">
        <MobileSidebar />
        <Logo />
        <FormPopover align="start" sideOffset={5} side="bottom">
            <Button variant="primary" size="sm" className="hidden md:block rounded-sm">Create</Button>
        </FormPopover>
        <FormPopover sideOffset={5}>
          <Button variant="primary" size="sm" className="md:hidden rounded-sm">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="flex gap-4 items-center">
        <OrganizationSwitcher 
          hidePersonal
          afterCreateOrganizationUrl="/organization/:id"
          afterSelectOrganizationUrl="/organization/:id"
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: "grid",
                placeItems: "center"
              }
            }
          }}
        />
        < UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: { height: 30, width: 30 }
            }
          }}
        />
      </div>
    </nav>
  )
}