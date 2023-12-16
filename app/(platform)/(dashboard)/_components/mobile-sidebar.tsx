"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import { useHasMounted } from "@/hooks/useHasMounted"

export const MobileSidebar = () => {
  return null
  const pathname = usePathname()
  const { onOpen, onClose, isOpen } = useMobileSidebar(state => state)

  // Close mobile sidebar when pathname changes
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Force component to not render on server.
  const { hasMounted } = useHasMounted()
  if (!hasMounted) {
    return null
  }

  return (
    <>
      <Button size="sm" variant="ghost" className="block md:hidden" onClick={onOpen}>
        <Menu className="h-4 w-4"/>
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="t-sidebar-mobile-state"/>
        </SheetContent>
      </Sheet>
    </>
  )
}