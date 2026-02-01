import type { Recipe } from "../types/types";

export function RecipeCard( { recipe }: {recipe: Recipe}) {

    return (
        <div>
            <h4>{recipe.title}</h4>
            <p>Category: {recipe.category[0]}</p>
            <img src={recipe.image}></img>
        </div>
    )
}