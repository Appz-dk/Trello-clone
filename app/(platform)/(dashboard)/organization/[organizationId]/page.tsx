import { db } from "@/lib/db"

const OrganizationIdPage = () => {

  // Trying out server actions with prisma database
  async function create(formData: FormData) {
    "use server"

    const title = formData.get("title")
    if (!title || typeof title !== "string") return

    await db.board.create({
      data: {
        title
      }
    })
  }

  return (
    <div>
      <form action={create}>
        <input id="title" name="title" placeholder="Enter title" className="border border-input p-1"/>
      </form>
    </div>
  )
}

export default OrganizationIdPage