import React, { FC } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import type { UserData } from '../types/Auth';

interface UserListProps {
    users: UserData[] // Changed from 'user' to 'users' for clarity
}
 
const UsersList: FC<UserListProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto  py-20">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Fisrt Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>role</TableHead>
            <TableHead>provider</TableHead>
            <TableHead>About</TableHead>
            <TableHead>ImageURL</TableHead>
            <TableHead>About</TableHead>
            <TableHead>Pyament</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.email ? `${user.email}-${index}` : `user-${index}`}>
              <TableCell>{user._id || 'N/A'}</TableCell>
              <TableCell>{user.firstName || 'N/A'}</TableCell>
              <TableCell>{user.lastName || 'N/A'}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.provider}</TableCell>
              <TableCell>{user.about || 'N/A'}</TableCell>
              <TableCell>{user.image || 'N/A'}</TableCell>
              <TableCell>{user.Pyament || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;