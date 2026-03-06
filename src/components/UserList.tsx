import { UserCard } from "./UserCard";
import type { UserCardProps } from "../types/types";

export function UserList({ users }: UserCardProps) {
  return (
    <div>
      {users && users.map((user) => {
        return <UserCard key={user._id} user={user} />
      })}
    </div>
  );
}