"use client"

import { useEffect, useState } from "react"

import { CardModal } from "@/components/modals/card-modal/card-modal"
import { ProModal } from "../modals/pro-modal"


export const ModalProvider = () => {
  // Protection from hydration errors
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  })

  // Only render this component on the client (useEffect only runs on the client)
  if (!isMounted) return null

  return (
    <>
    <CardModal />
    <ProModal />
    </>
  )
}