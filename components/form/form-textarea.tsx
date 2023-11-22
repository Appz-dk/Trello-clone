"use client"

import { KeyboardEventHandler, forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { FormErrors } from "./form-errors";

type Props = {
  id: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
  onClick?: () => void;
  autoFocus?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
  props?: TextareaProps;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(({
  id,
  className,
  defaultValue,
  disabled,
  errors,
  label,
  onBlur,
  onClick,
  onKeyDown,
  placeholder,
  required,
  autoFocus,
  props
}, ref) => {

  const { pending } = useFormStatus()

  return (
    <div className="space-y-2 w-full">
      <div className="space-y-1 w-full">
        {label && (
          <Label htmlFor={id} className="font-semibold text-sm text-neutral-700">
            {label}
          </Label>
        )}
        <Textarea
          className={cn("text-sm resize-none shadow-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0", className)}
          id={id}
          name={id}
          ref={ref}
          defaultValue={defaultValue}
          disabled={pending || disabled}
          placeholder={placeholder}
          required={required}
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          aria-describedby={`${id}-error`}
          autoFocus={autoFocus}
          {...props}
        />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )
})

FormTextarea.displayName = "FormTextarea"