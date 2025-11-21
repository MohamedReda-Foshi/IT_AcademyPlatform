import { cookies } from 'next/headers'

export async function fetchAllCourseFromExprAdmin() {
  // Read the actual NextAuth session cookie name
  const store = await cookies()
  const sessionToken =
    store.get('__Secure-next-auth.session-token')?.value ||
    store.get('next-auth.session-token')?.value

  if (!sessionToken) {
    throw new Error('Unauthorized: no session-token cookie')
  }

  // Forward the token to your Express API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/AllCourse`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }
  return res.json()
}

export async function fetchPutCourseFromExprAdmin() {
  // Read the actual NextAuth session cookie name
  const store = await cookies()
  const sessionToken =
    store.get('__Secure-next-auth.session-token')?.value ||
    store.get('next-auth.session-token')?.value

  if (!sessionToken) {
    throw new Error('Unauthorized: no session-token cookie')
  }

  // Forward the token to your Express API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/AllCourse`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }
  return res.json()
}

export async function fetchDeleteCourseFromExprAdmin() {
  // Read the actual NextAuth session cookie name
  const store = await cookies()
  const sessionToken =
    store.get('__Secure-next-auth.session-token')?.value ||
    store.get('next-auth.session-token')?.value

  if (!sessionToken) {
    throw new Error('Unauthorized: no session-token cookie')
  }

  // Forward the token to your Express API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/AllCourse`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }
  return res.json()
}



























// user 

export async function fetchAllUserFromExprAdmin() {
  // Read the actual NextAuth session cookie name
  const store = await cookies()
  const sessionToken =
    store.get('__Secure-next-auth.session-token')?.value ||
    store.get('next-auth.session-token')?.value

  if (!sessionToken) {
    throw new Error('Unauthorized: no session-token cookie')
  }

  // Forward the token to your Express API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/getuser`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
    }
  )
  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }
  return res.json()
}
