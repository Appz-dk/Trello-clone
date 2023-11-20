import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

type Props = {
  board: Board
}

export const BoardNavbar = ({ board }: Props) => {
  return (
    <div className="fixed top-14 w-full h-14 z-40 text-white bg-black/40 flex items-center px-6 gap-4">
      <BoardTitleForm board={board} />
      <div className="ml-auto">
        <BoardOptions id={board.id}/>
      </div>
    </div>
  )
}