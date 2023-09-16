import React from "react"
import { createIconAttributes } from "@/components/icons/setup/createIconAttributes"
import { IconProps } from "@/components/icons/setup/icon-props"

export const IconEye = React.forwardRef<React.ElementRef<"svg">, IconProps>(
  function IconEyeComponent(props, ref) {
    const attributes = createIconAttributes(props)

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...attributes}
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle
          cx={12}
          cy={12}
          r={3}
        />
      </svg>
    )
  }
)
