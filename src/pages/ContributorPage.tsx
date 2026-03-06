import { useState, useEffect, useContext } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { getRecipes, getMemories, getUsers } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import { MemoryList } from '../components/MemoryList';
import { UserList } from '../components/UserList';
import type { Recipe, Memory, User } from '../types/types';
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
    const [users, setUsers] = useState<User[]>([]);
    const location = useLocation();
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

    const { searchValue, filterValue, selectedOptions } = searchContext;

    // Redirect to login page if not authenticated
    const { isAuthenticated } = authContext;
    if (!isAuthenticated) {
        // Redirects to the login page if the condition (isLoggedIn) is false
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        getRecipes().then(data => setRecipes(data));
        getMemories().then(data => setMemories(data));
        getUsers().then(data => setUsers(data));
    }, []);

    // Display only contributor recipes
    useEffect(() => {
        setFilteredRecipes(recipes.filter((recipe) => {
            if (recipe.user === userId) {
                return recipe;
            }
        }))
    }, [recipes, userId, location.pathname]);

    // Display only user memories
    useEffect(() => {
        setFilteredMemories(memories.filter((memory) => {
            if (memory.user === userId) {
                return memory;
            }
        }))
    }, [memories, userId, location.pathname]);

    // Display recipes based on search bar
    useEffect(() => {
        const filterRecipes = filteredRecipes.filter(recipe => {
            if ((searchValue === "") && (recipe.user === userId)) {
                return recipe;
            } else if (recipe.title.toLowerCase().includes(searchValue!.toLowerCase())) {
                return recipe;
            }
        })
        setSearchRecipes(filterRecipes);
    }, [filteredRecipes, searchValue]);

    // Display recipes based on category
    useEffect(() => {
        const filterRecipes = filteredRecipes.filter(recipe => {
            if ((filterValue === "") && (recipe.user === userId)) {
                return recipe;
            } else if ((recipe.category === filterValue) && (recipe.user === userId)) {
                return recipe;
            }
        })
        setSearchRecipes(filterRecipes);
    }, [filteredRecipes, filterValue]);

    // Display recies based on tag selection
    useEffect(() => {
        const filterRecipes = recipes.filter(recipe => {
            if ((selectedOptions.length < 1 || selectedOptions == undefined) && (recipe.user === userId)) {
                return recipe;
            } else {
                for (let i = 0; i < selectedOptions.length; i++) {
                    if ((recipe.tags.includes(selectedOptions[i].value)) && (recipe.user === userId)) {
                        return recipe;
                    }
                }
            }
        })
        setFilteredRecipes(filterRecipes);
    }, [selectedOptions]);

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
            <div className='list-container'>
                <h2>Contributors</h2>
                <UserList users={users} />
            </div>
        </div>
    );
}