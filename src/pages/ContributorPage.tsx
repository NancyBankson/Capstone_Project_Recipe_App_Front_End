import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipes } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import type { Recipe } from '../types/types';

export function ContributorPage() {
    const { userId } = useParams();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

    useEffect(() => {
        getRecipes().then(data => setRecipes(data));        
    }, []);

    useEffect(() => {
        setFilteredRecipes(recipes.filter((recipe) => {
            console.log(recipe.user);
            console.log(userId);
            if (recipe.user === userId) {
                return recipe;
            }
        }))
    }, [recipes]);

    return (
        <div>
            <h2>Recipes</h2>
            <div className='container'>
                <RecipeList recipes={filteredRecipes} />
            </div>
        </div>
    );
}