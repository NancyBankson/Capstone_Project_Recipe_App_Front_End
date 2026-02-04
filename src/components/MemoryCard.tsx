import type { Memory } from "../types/types";
import { Link } from "react-router-dom";

export function MemoryCard( { memory }: {memory: Memory}) {

    return (
        <div>
            <Link to={`/memory/${memory._id}`}>{memory.title}</Link>
            {(memory.image) && <img src={memory.image}></img>}
        </div>
    )
}