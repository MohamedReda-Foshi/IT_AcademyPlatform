'use client';

import React from 'react';
import Image from 'next/image';
import { authClient } from '../lib/auth-client';

export default function Avatar() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session?.user) {
    return null;
  }

  const defaultAvatar = '/avatar.png';
  const { name, image } = session.user;

  return (
    <div className="flex items-center flex-row gap-2 py-3">
      <Image
        className="rounded-full"
        src={image || defaultAvatar}
        width={50}
        height={50}
        alt={name || 'Avatar'}
        priority
      />
      <p className="text-sm">{name}</p>
    </div>
  );
}