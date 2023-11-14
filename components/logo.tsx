import Image from "next/image"
import Link from "next/link"
import localFont from "next/font/local"

import { cn } from "@/lib/utils"

const LogoFont = localFont({
  src: "../public/fonts/font.woff2"
})

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden md:flex items-center gap-2 hover:opacity-75 transition">
        <Image src={"/logo.svg"} alt="logo" width={30} height={30}/>
        <p className={cn(
          "text-lg text-neutral-700",
          LogoFont.className
        )}>Taskify</p>
      </div>
    </Link>
  )
}