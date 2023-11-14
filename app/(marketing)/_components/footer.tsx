import { Button } from "@/components/ui/button"

export const Footer = () => {
  return (
    <nav className="fixed bottom-0 w-full p-4 bg-slate-100  border-t">
      <div className="md:max-w-screen-2xl flex items-center justify-end w-full mx-auto">
        <div className="space-x-4 md:block md:w-auto w-full flex justify-between">
          <Button size="sm" variant="ghost">
              Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
              Terms of Service
          </Button>
        </div>
      </div>
    </nav>
  )
}