import { forwardRef, ComponentPropsWithRef } from "react"

type Props = {
  children: React.ReactNode
  props?: React.HTMLAttributes<HTMLLIElement>
}

export const ListWrapper = forwardRef<HTMLLIElement, ComponentPropsWithRef<"li">>(({ children, ...props }, ref) => {
  return (
    <li ref={ref} className="flex-shrink-0 w-[272px] h-full select-none" {...props}>
      {children}
    </li>
  )
})