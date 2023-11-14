import { Medal } from "lucide-react"
import localFont from "next/font/local"
import { Poppins } from "next/font/google"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HeadingFont = localFont({
  src: "../../public/fonts/font.woff2"
})

const TextFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900" ]
})

const MarketingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 p-4 uppercase shadow-sm border mb-4">
          <Medal className="h-6 w-6"/>
          No. 1 Task management
        </div>
        <h1 className={cn(
          "text-3xl md:text-6xl text-neutral-800 text-center mb-6",
          HeadingFont.className
        )}>Taskify helps team move</h1> 
        <div className="text-3xl md:text-6xl text-white bg-gradient-to-r from-pink-600 to-fuchsia-600 px-4 py-2 pb-4 rounded-sm w-fit">
          Work forward.
        </div>
      </div>
      <div className={cn(
        "text-sm md:text-xl max-w-xs md:max-w-2xl text-center text-neutral-400 mt-4 mx-auto",
        TextFont.className
      )}>
        Collaborate, manage projects and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Taskify.
      </div>
      <Button className="mt-6" size={"lg"} asChild>
        <Link href="/sign-up">Get Taskify for free</Link>
      </Button>
    </div>
  )
}

export default MarketingPage