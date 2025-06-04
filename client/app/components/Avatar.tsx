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
    const defaultAvatar="../asset/image/avatar.png";

  return (
    <div className="flex items-center flex-row gap-2 py-3">
      <Image
        className='rounded-full'
        src={image ?? defaultAvatar}
        width={40}
        height={40}
        alt="user profile image"
        objectFit='cover'
      />
      <p className="text-sm">{name}</p>
    </div>
  )
}
