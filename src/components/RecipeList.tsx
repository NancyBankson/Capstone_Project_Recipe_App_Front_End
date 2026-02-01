import { RecipeCard } from "./RecipeCard";
import type { RecipeCardProps } from "../types/types";

export function RecipeList({ recipes }: RecipeCardProps) {
  return (
    <div>
      {recipes && recipes.map((recipe) => {
        return <RecipeCard key={recipe._id} recipe={recipe} />
      })}
    </div>
  );
}