"use client"

import { useQuery } from "@tanstack/react-query"

import { fetcher } from "@/lib/fetcher"
import { AuditLog } from "@prisma/client"
import { CardWithList } from "@/types/types"
import { useCardModal } from "@/hooks/use-card-modal"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CardModalHeader } from "./card-modal-header"
import { CardModalDescription } from "./card-modal-description"
import { CardModalActions } from "./card-modal-actions"
import { Activity } from "./activity"

export const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal(state => state)

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`)
  })

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-audit-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`)
  })

  if (!cardData) return null

  const modalHeaderContent = cardData ? <CardModalHeader data={cardData} /> : <CardModalHeader.Skeleton />
  const modalDescriptionContent = cardData ? <CardModalDescription data={cardData} /> : <CardModalDescription.Skeleton />
  const modalActionContent = cardData ? <CardModalActions data={cardData} /> : <CardModalActions.Skeleton />
  const modalLogsContent = auditLogsData   ? <Activity logsData={auditLogsData} /> : <Activity.Skeleton />

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div>
          {modalHeaderContent}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
            <div className="col-span-3">
              <div className="w-full space-y-4">
                {modalDescriptionContent}
                {modalLogsContent}
              </div>
            </div>
            {modalActionContent}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
