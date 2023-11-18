import { db } from "@/lib/db"
import { Board } from "./_temp-components/board"
import { FormInput } from "./_temp-components/form-input"

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()

  return (
    <div className="space-y-4">
        <FormInput />
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