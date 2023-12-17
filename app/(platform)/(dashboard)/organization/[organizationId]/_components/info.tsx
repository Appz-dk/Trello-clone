"use client"

import { useHasMounted } from "@/hooks/useHasMounted";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs"
import { CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  isSubscriped: boolean
}

export const Info = ({ isSubscriped }: Props) => {
  const { organization, isLoaded } = useOrganization()

  // Amazing Read!
  // https://medium.com/@mohit-vaswani/hydration-failed-in-next-js-what-it-is-and-how-to-fix-it-e566e15b680e
  // This component has to be client side only due to hydrations issues
  const { hasMounted } = useHasMounted()
  if (!hasMounted) {
    return null;
  }



  if (!isLoaded) {
    return <Info.Skeleton />
  }


  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 relative">
          <Image fill sizes="auto" className="object-cover rounded-md" src={organization?.imageUrl || ""} alt="logo"/>
        </div>
        <div className="flex flex-col justify-center items-start">
          <p className="text-xl font-semibold">{organization?.name}</p>
          <div className="flex gap-1 items-center text-xs text-muted-foreground">
            <CreditCard className="w-3 h-3" />
            <p>{isSubscriped ? "Pro" : "Free"}</p>
          </div>
        </div>
      </div>
    </>
  )
} 

Info.Skeleton = function SkeletonInfo () {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="w-14 h-14"/>
      <div className="flex flex-col gap-2 justify-center items-start">
        <Skeleton className="w-32 h-6" />
        <div className="flex gap-2">
          <Skeleton className="w-4 h-4"/>
          <Skeleton className="w-16 h-4"/>
        </div>
      </div>
    </div>
  )
}