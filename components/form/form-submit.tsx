"use client"

import { useFormStatus } from "react-dom"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"

type Props = {
  children: React.ReactNode
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "default" | "destructive" | "link" | "ghost" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  // onClick?: () => void;
}


export const FormSubmit: React.FC<Props> = ({ 
  children, 
  disabled, 
  className, 
  // onClick, 
  variant = "primary", 
  size = "sm" 
}) => {

  const {pending} = useFormStatus()

  return (
    <Button
      variant={variant}
      size={size}
      disabled={pending || disabled} 
      type="submit" 
      className={cn(className)}
      // onClick={onClick}
    >
      {children}
    </Button>
  )
}