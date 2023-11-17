import { createBoard } from "@/actions/createBoard"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { Board } from "./_temp-components/board"

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()

  return (
    <div className="space-y-4">
      <form action={createBoard}>
        <input id="title" name="title" placeholder="Enter title" className="border border-input p-1"/>
        <Button type="submit" className="ml-2">Submit</Button>
      </form>
      <div className="space-y-1">
        {boards.map(board => (
          <div key={board.id} className="flex gap-2 items-center">
            <Board key={board.id} title={board.title} id={board.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage