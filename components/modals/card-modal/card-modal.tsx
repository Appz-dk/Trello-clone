"use client"

import { useQuery } from "@tanstack/react-query"

import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types/types"
import { useCardModal } from "@/hooks/use-card-modal"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CardModalHeader } from "./card-modal-header"
import { CardModalDescription } from "./card-modal-description"
import { CardModalActions } from "./card-modal-actions"

export const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal(state => state)
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  if (!cardData) return null

  const modalHeaderContent = cardData ? <CardModalHeader data={cardData} /> : <CardModalHeader.Skeleton />
  const modalDescriptionContent = cardData ? <CardModalDescription data={cardData} /> : <CardModalDescription.Skeleton />
  const modalActionContent = cardData ? <CardModalActions data={cardData} /> : <CardModalActions.Skeleton />

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="max-w-[440px]">
          {modalHeaderContent}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
            <div className="col-span-3">
              {modalDescriptionContent}
            </div>
            {modalActionContent}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
