import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { siteName } from "@/config/site"
import Link from "next/link"

export const Navbar = () => {
  return (
    <nav className="fixed top-0 h-14 w-full px-4 bg-white flex items-center border-b shadow-sm">
      {/* TOOD: Not sure about the below div styling, but should look nicer on bigger screens */}
      <div className="md:max-w-screen-2xl flex items-center justify-between w-full mx-auto">
        <div>
          <Logo />
        </div>
        <div className="space-x-4 md:block md:w-auto w-full flex justify-between">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">
              Login
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-in">
              Get {siteName} for free
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}