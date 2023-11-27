"use client"

import { toast } from "sonner"
import { useAction } from "@/hooks/use-action"
import { stripeRedirect } from "@/actions/stripe-redirect"

import { Button } from "@/components/ui/button"
import { useProModal } from "@/hooks/use-pro-modal"


type Props = {
  isSubscriped: boolean
}

export const SubscriptionButton = ({ isSubscriped }: Props) => {
  const { onOpen: onOpenProModal } = useProModal(state => state)
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data
    },
    onError(error) {
      toast.error(error)
    }
  })

  const onClickHandler = () => {
    if (isSubscriped) {
      execute({})
    } else {
      onOpenProModal()
    }
  }


  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={onClickHandler}
    >
      {isSubscriped ? "Manage subscription" : "Upgrade to Pro"}
    </Button>
  )
}