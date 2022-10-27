import clsx from 'clsx'
import { ReactNode } from "react";

interface propContainer {
  className?: string,
  children: ReactNode
}

export function Container({ className, ...props } : propContainer) {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
