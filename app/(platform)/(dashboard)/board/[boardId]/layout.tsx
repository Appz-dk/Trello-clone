import { auth } from "@clerk/nextjs"
import { notFound, redirect } from "next/navigation"

import { db } from "@/lib/db"
import { BoardNavbar } from "./_components/board-navbar"

type Props = {
  children: React.ReactNode
  params: { boardId: string }
}

const BoardIdLayout: React.FC<Props> = async ({ children, params }) => {
  const { orgId } = auth()

  if (!orgId) {
    return redirect(`/select-org`)
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  })

  // If no board found then tigger 404 not found
  if (!board) notFound()

  return (
    <div 
      className="h-full bg-center bg-cover bg-no-repeat relative" 
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar board={board}/>
      <div className="absolute inset-0 bg-black/10" />
      <main className="h-full relative pt-28">
        {children}
      </main>
    </div>
  )
}

export default BoardIdLayout


export async function generateMetadata({ params }: { params: { boardId: string }}) {
  const { orgId } = auth()

  if (!orgId) return { title: "Board" }

  const boardData = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId
    },
    select: {
      title: true
    }
  })

  return {
    title: boardData?.title || "Board"
  };
};