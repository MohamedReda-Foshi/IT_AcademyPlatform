import React from 'react'
import UserTable from '../../components/UserTable'
import type { UserData } from '../../types/Auth'
import { fetchAllUserFromExprAdmin } from '@/app/lib/api/admin'

export default async function  Page() {

  let users: UserData[]=[]
   try {
        users = await fetchAllUserFromExprAdmin()
        console.log("this are users users",users);
      } catch (err) {
        console.log("error in users page",err)
        // You could render an error state here
      }
  return (
    <div>
      <UserTable
      users={users}/>
    </div>
  )
}

