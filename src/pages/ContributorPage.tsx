import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipes, getMemories } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import { MemoryList } from '../components/MemoryList';
import type { Recipe, Memory } from '../types/types';

export function ContributorPage() {
    const { userId } = useParams();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
    const [memories, setMemories] = useState<Memory[]>([]);
     const [filteredMemories, setFilteredMemories] = useState<Memory[]>(memories);

    useEffect(() => {
        getRecipes().then(data => setRecipes(data));
    }, []);

    useEffect(() => {
        setFilteredRecipes(recipes.filter((recipe) => {
            if (recipe.user === userId) {
                return recipe;
            }
        }))
    }, [recipes]);

    useEffect(() => {
        getMemories().then(data => setMemories(data));
    }, []);

       useEffect(() => {
        setFilteredMemories(memories.filter((memory) => {
            if (memory.user === userId) {
                return memory;
            }
        }))
    }, [memories]);

    return (
        <div>
            <h2>Recipes</h2>
            <div className='container'>
                <RecipeList recipes={filteredRecipes} />
                <MemoryList memories={filteredMemories} />
            </div>
        </div>
    );
}