import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ListContainer } from "./_components/list-container"

type Props = {
  params: {
    boardId: string
  }
}

const BoardIdPage = async ({ params }: Props) => {
  const { orgId } = auth()

  if (!orgId) redirect("/select-org")


  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId
      }
    },

    orderBy: {
      order: "asc"
    },

    include: {
      cards: {
        orderBy: {
          order: "asc"
        }
      }
    }
  })


  return (
    <div className="h-full p-4 overflow-x-auto">
      <ListContainer boardId={params.boardId} lists={lists} />
    </div>
  )
}

export default BoardIdPage