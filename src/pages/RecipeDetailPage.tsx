import { useParams } from "react-router-dom"
import type { Recipe } from "../types/types";
import { useState, useEffect } from 'react';
import { getOneRecipe } from "../utils/recipes-api";

export function RecipeDetailPage() {
  const { recipeId } = useParams();
  // const [recipes, setRecipes] = useState([]);
  // const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [displayRecipe, setDisplayRecipe] = useState<Recipe>({
    _id: "12345",
    user: "user",
    title: "title",
    category: "category",
    ingredients: "ingredients",
    instructions: "instructions",
    image: "image",
    tags: ["tags"],
    source: "source"
  });

  useEffect(() => {
    getOneRecipe(recipeId!).then(data => setDisplayRecipe(data));    
  }, []);

  return (
    <div className='container'>
      <div className="recipe-full" key={displayRecipe._id}>
        <div className="recipe-head">
          <img src={displayRecipe.image} />
          <h1>{displayRecipe.title}</h1>
          {/* <button onClick={handleFavorite}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</button> */}
        </div>
        <div className="recipe-body">
          <div className="ingredients">
            <h2>Ingredients</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{displayRecipe.ingredients}</p>      
          </div>
          <h2>Instructions</h2>
          <p>{displayRecipe.instructions}</p>
          <h3>Category: {displayRecipe.category}</h3>
          <h3>Source: <a href={displayRecipe.source}>{displayRecipe.source}</a></h3>
        </div>
      </div>
    </div>
  );
}