import clsx from 'clsx'
import { ReactElement, ReactNode } from "react"

const formClasses =
  'block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm'

interface propLabel {
  id: string,
  children: ReactNode
}

function Label({ id, children }:propLabel) {
  return (
    <label
      htmlFor={id}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  )
}

interface propTextField {
  id: string,
  label: string,
  type : string,
  className: string,
  children: ReactElement
}

export function TextField({
  id,
  label,
  type = 'text',
  className = '',
  ...props
}: propTextField) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}

interface propSelectField {
  id: string,
  label: string,
  type : string,
  className: string,
  children: ReactElement
}

export function SelectField({ id, label, className = '', ...props } : propSelectField) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')} />
    </div>
  )
}
