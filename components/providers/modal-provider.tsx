"use client"

import { CardModal } from "@/components/modals/card-modal/card-modal"
import { ProModal } from "../modals/pro-modal"
import { useHasMounted } from "@/hooks/useHasMounted"


export const ModalProvider = () => {
  const { hasMounted } = useHasMounted()

  if (!hasMounted) {
    return null
  }

  return (
    <>
    <CardModal />
    <ProModal />
    </>
  )
}