import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Props = {
  children: React.ReactNode;
  description: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export const Hint: React.FC<Props> = ({ children, description, side = "bottom", sideOffset = 0 }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className="text-sm max-w-[220px] break-words"
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}