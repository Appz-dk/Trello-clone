"use client"

import { useQuery } from "@tanstack/react-query"

import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types/types"
import { useCardModal } from "@/hooks/use-card-modal"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CardModalHeader } from "./card-modal-header"

export const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal(state => state)
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  if (!cardData) return null

  const modalHeaderContent = cardData ? <CardModalHeader data={cardData} /> : <CardModalHeader.Skeleton />

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent >
        {modalHeaderContent}
      </DialogContent>
    </Dialog>
  )
}
