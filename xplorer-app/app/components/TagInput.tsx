"use client"

import React from 'react'
import { IconType } from 'react-icons'
interface TagInputProps{
    icon: IconType
    label:  string
    selected?: boolean
    onClick: (value: string) =>void
}
const TagInput: React.FC<TagInputProps>= ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
  return (
    <div>
       <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-yellow-500
        transition
        cursor-pointer
        ${selected ? 'border-yellow-500' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </div>
    </div>
  )
}

export default TagInput
