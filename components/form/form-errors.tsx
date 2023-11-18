import { XCircle } from "lucide-react"

type Props = {
  id: string;
  errors?: Record<string, string[] | undefined>
}

export const FormErrors: React.FC<Props> = ({ id, errors }) => {

  // Only render this component if we have any errors
  if (!errors) return null

  return (
    <div 
      className="text-rose-500 mt-2 text-sm"
      aria-live="polite"
      id={`${id}-error`}
    >
      {errors?.[id]?.map(error => (
        <div 
          key={error}
          className="flex gap-2 items-center bg-rose-500/10 font-medium p-2 border border-rose-500 rounded-sm"
        >
          <XCircle className="w-4 h-4"/>
          {error}
        </div>
      ))}
    </div>
  )
} 