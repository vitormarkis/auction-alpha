import "moment/locale/pt-br"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const FeedInfo: React.FC<Props> = ({ className, children, ...rest }) => {
  return (
    <div
      {...rest}
      className={`${className} p-6 border-b border-b-neutral-500 bg-white`}
    >
      <div
      // className="mt-3"
      >
        {children}
      </div>
    </div>
  )
}
