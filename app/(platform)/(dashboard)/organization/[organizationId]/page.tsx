import { createBoard } from "@/actions/createBoard"
import { Button } from "@/components/ui/button"

const OrganizationIdPage = () => {

  return (
    <div>
      <form action={createBoard}>
        <input id="title" name="title" placeholder="Enter title" className="border border-input p-1"/>
        <Button type="submit" className="ml-2">Submit</Button>
      </form>
    </div>
  )
}

export default OrganizationIdPage