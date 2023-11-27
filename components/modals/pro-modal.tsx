"use client"

import Image from "next/image"
import { toast } from "sonner"
import { siteName } from "@/config/site"

import { useAction } from "@/hooks/use-action"
import { stripeRedirect } from "@/actions/stripe-redirect"

import { useProModal } from "@/hooks/use-pro-modal"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const ProModal = () => {
  const { isOpen, onClose } = useProModal(state => state)

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      // Redirect user
      window.location.href = data
    },
    onError(error) {
      toast.error(error)
    },
  })

  const onClickHandler = () => {
    execute({})
  }


  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative aspect-video">
          <Image className="object-cover" src={"/hero.svg"} alt="hero image" fill/>
        </div>
          <div className="mx-auto p-6 text-neutral-700 space-y-6">
            <h2 className="text-xl font-semibold">Upgrade to {siteName} Pro Today!</h2>
            <p className="text-sm font-semibold">Explore the best of {siteName}</p>
            <ul className="pl-3 list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
            <Button onClick={onClickHandler} disabled={isLoading} className="w-full" variant="primary" >Upgrade</Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}