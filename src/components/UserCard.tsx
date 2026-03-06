import type { User } from "../types/types";
import { Link } from "react-router-dom";

export function UserCard( { user }: {user: User}) {

    return (
        <div>
            <Link to={`/${user._id}`}>{user.username}</Link>
        </div>
    )
}