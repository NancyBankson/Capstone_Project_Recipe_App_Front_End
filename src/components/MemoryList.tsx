import { MemoryCard } from "./MemoryCard";
import type { MemoryCardProps } from "../types/types";

export function MemoryList({ memories }: MemoryCardProps) {
  return (
    <div>
      {memories && memories.map((memory) => {
        return <MemoryCard key={memory._id} memory={memory} />
      })}
    </div>
  );
}