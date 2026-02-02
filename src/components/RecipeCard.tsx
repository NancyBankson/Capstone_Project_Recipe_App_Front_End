import type { Recipe } from "../types/types";
import { Link } from "react-router-dom";

export function RecipeCard( { recipe }: {recipe: Recipe}) {

    return (
        <div>
            <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
            <p>Category: {recipe.category}</p>
            <img src={recipe.image}></img>
        </div>
    )
}