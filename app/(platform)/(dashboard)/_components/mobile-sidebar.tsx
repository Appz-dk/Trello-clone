"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

export const MobileSidebar = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const { onOpen, onClose, isOpen } = useMobileSidebar(state => state)

  // Close mobile sidebar when pathname changes
  useEffect(() => {
    onClose()
  }, [pathname])

  // Force component to not render on server.
  // useEffect will only run on the client if isMounted has not been set to true
  // we will simply return null. This makes sure this component only is rendered on the client side
  useEffect(() => {
    setIsMounted(true)
  }, [setIsMounted])
  
  if (!isMounted) return null

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