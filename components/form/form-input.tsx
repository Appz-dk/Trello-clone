"use client"

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { FormErrors } from "./form-errors";

type Props = {
  id: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(({
  id,
  className,
  defaultValue,
  disabled,
  errors,
  label,
  onBlur,
  placeholder,
  required,
  type,
}, ref) => {

  const { pending } = useFormStatus()

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        {label && (
          <Label htmlFor={id} className="font-semibold text-sm text-neutral-700">
            {label}
          </Label>
        )}
        <Input
          className={cn("text-sm h-7 py-1 px-2", className)}
          id={id}
          name={id}
          ref={ref}
          defaultValue={defaultValue}
          disabled={pending || disabled}
          placeholder={placeholder}
          required={required}
          type={type}
          onBlur={onBlur}
          aria-describedby={`${id}-error`}
        />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )
})

FormInput.displayName = "FormInput"