import { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getRecipes, getMemories } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import { MemoryList } from '../components/MemoryList';
import type { Recipe, Memory } from '../types/types';
import { AuthContext } from '../context/AuthContext';
import { SearchContext } from '../context/SearchContext';

export function ContributorPage() {
    const authContext = useContext(AuthContext);
    const { userId } = useParams();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
    const [searchRecipes, setSearchRecipes] = useState<Recipe[]>(filteredRecipes);
    const [memories, setMemories] = useState<Memory[]>([]);
    const [filteredMemories, setFilteredMemories] = useState<Memory[]>(memories);
    const searchContext = useContext(SearchContext);

    if (!searchContext) {
        return (
            <h3>Error</h3>
        )
    }

    if (!authContext) {
        return (
            <h3>Error</h3>
        )
    }

    const { searchValue, filterValue } = searchContext;

    // Redirect to login page if not authenticated
    const { isAuthenticated } = authContext;
    if (!isAuthenticated) {
        // Redirects to the login page if the condition (isLoggedIn) is false
        return <Navigate to="/login" replace />;
    }

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

    useEffect(() => {
        const filterRecipes = filteredRecipes.filter(recipe => {
            if (searchValue === "") {
                return recipe;
            } else if (recipe.title.toLowerCase().includes(searchValue!.toLowerCase())) {
                return recipe;
            }
        })
        setSearchRecipes(filterRecipes);
    }, [filteredRecipes, searchValue]);

    useEffect(() => {
        const filterRecipes = filteredRecipes.filter(recipe => {
            if (filterValue === "") {
                return recipe;
            } else if (recipe.category === filterValue) {
                return recipe;
            }
        })
        setSearchRecipes(filterRecipes);
    }, [filteredRecipes, filterValue]);

    return (
        <div id="contributor-container">
            <div className='list-container'>
                <h2>Recipes</h2>
                <RecipeList recipes={searchRecipes} />
            </div>
            <div className='list-container'>
                <h2>Memories</h2>
                <MemoryList memories={filteredMemories} />
            </div>
        </div>
    );
}