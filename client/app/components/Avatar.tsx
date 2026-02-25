'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Avatar() {
  const { data: session, status } = useSession()

  if (status === 'loading' || !session?.user) {
    return null
  }

  const { name, image } = session.user
    const defaultAvatar="/avatar.png";

  return (
    <div className="flex items-center flex-row gap-2 py-3">
      <Image
        className='rounded-full'
        src={image ?? defaultAvatar}
        width={40}
        height={40}
        alt="Avatar"
        priority
        style={{width: 'auto', height: 'auto'}}
      />
      <p className="text-xl capitalize font-bold">{name}</p>
    </div>
  )
}
