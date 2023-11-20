
type Props = {
  children: React.ReactNode
}

export const ListWrapper = ({ children }: Props) => {
  return (
    <li className="flex-shrink-0 w-[272px] h-full select-none">
      {children}
    </li>
  )
}