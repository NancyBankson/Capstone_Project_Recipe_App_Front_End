import { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getRecipes, getMemories } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import { MemoryList } from '../components/MemoryList';
import type { Recipe, Memory } from '../types/types';
import { AuthContext } from '../context/AuthContext';

export function ContributorPage() {
    const authContext = useContext(AuthContext);
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

    if (!authContext) {
        return (
            <h3>Error</h3>
        )
    }

    // Redirect to login page if not authenticated
    const { isAuthenticated } = authContext;
    if (!isAuthenticated) {
        // Redirects to the login page if the condition (isLoggedIn) is false
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <div className='container'>
                <h2>Recipes</h2>
                <RecipeList recipes={filteredRecipes} />
                <h2>Memories</h2>
                <MemoryList memories={filteredMemories} />
            </div>
        </div>
    );
}