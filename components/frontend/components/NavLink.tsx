import Link from 'next/link'
import { ReactNode } from "react";

interface propNavLink {
  href: string,
  children: ReactNode
}

export function NavLink({ href, children }: propNavLink) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}
