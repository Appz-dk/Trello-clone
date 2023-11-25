import { toast } from "sonner"
import { Copy, Trash } from "lucide-react"
import { useParams } from "next/navigation"

import { useCardModal } from "@/hooks/use-card-modal"
import { useAction } from "@/hooks/use-action"
import { copyCard } from "@/actions/copy-card"
import { deleteCard } from "@/actions/delete-card"

import { CardWithList } from "@/types/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

type Props = {
  data: CardWithList
}

export const CardModalActions = ({ data }: Props) => {
  const params = useParams()
  const { onClose: onModalClose } = useCardModal(state => state)
  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
    onSuccess() {
      toast.success(`Card Copied`)
      onModalClose()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
    onSuccess(data) {
      toast.success(`Card "${data.title}" deleted`)
      onModalClose()
    },
    onError(error) {
      toast.error(error)
    },
  })

  const onCopyCard = () => {
    const boardId = params.boardId as string
    executeCopyCard({id: data.id, boardId})
  }

  const onDeleteCard = () => {
    const boardId = params.boardId as string
    executeDeleteCard({id: data.id, listId: data.listId, boardId})
  }

  return (
    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-1 gap-2 mt-2">
      <p className="text-xs font-semibold col-span-full">Actions</p>

      <Button 
        className="w-full gap-2 justify-start" 
        size="inline" 
        variant="gray" 
        onClick={onCopyCard}
        disabled={isLoadingCopy}
      >
        <Copy className="h-4 w-4" /> 
        Copy
      </Button>

      <Button 
        className="w-full gap-2 justify-start" 
        size="inline" 
        variant="gray" 
        onClick={onDeleteCard}
        disabled={isLoadingDelete}
      >
        <Trash className="h-4 w-4" /> 
        Delete
      </Button>

    </div>
  )
}





CardModalActions.Skeleton = function() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  )
}