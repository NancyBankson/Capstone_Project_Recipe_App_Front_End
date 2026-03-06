import { useState, useEffect, useContext } from 'react';
import { getRecipes, getMemories } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import { MemoryList } from '../components/MemoryList';
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';
import type { Recipe, Memory } from '../types/types';

export function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [filteredMemories, setFilteredMemories] = useState<Memory[]>(memories);
  const searchContext = useContext(SearchContext);
  const authContext = useContext(AuthContext);

  if (!searchContext) {
    return (
      <h3>Error</h3>
    )
  }

  const { searchValue, filterValue, selectedOptions } = searchContext;

  if (!authContext) {
    return (
      <h3>Error</h3>
    )
  }

  const { user } = authContext;

  useEffect(() => {
    getRecipes().then(data => setRecipes(data));
  }, []);

  useEffect(() => {
    getMemories().then(data => setMemories(data));
  }, []);

  useEffect(() => {
    const filterRecipes = recipes.filter(recipe => {
      if (recipe.privacy === "Public") {
        return recipe;
      } else if (user._id === recipe.user) {
        return recipe;
      }
    })
    setFilteredRecipes(filterRecipes);
  }, [recipes]);

  useEffect(() => {
    const filterMemories = memories.filter(memory => {
      if (memory.privacy === "Public") {
        return memory;
      } else if (user._id === memory.user) {
        return memory;
      }
    })
    setFilteredMemories(filterMemories);
  }, [memories]);

  useEffect(() => {
    const filterRecipes = recipes.filter(recipe => {
      if (searchValue === "") {
        return recipe;
      } else if (recipe.title.toLowerCase().includes(searchValue!.toLowerCase())) {
        return recipe;
      }
    })
    setFilteredRecipes(filterRecipes);
  }, [searchValue]);

  useEffect(() => {
    const filterRecipes = recipes.filter(recipe => {
      if (filterValue === "") {
        return recipe;
      } else if (recipe.category === filterValue) {
        return recipe;
      }
    })
    setFilteredRecipes(filterRecipes);
  }, [filterValue]);

  useEffect(() => {
    const filterRecipes = recipes.filter(recipe => {
      if (selectedOptions.length < 1 || selectedOptions == undefined) {
        return recipe;
      } else {
        for (let i = 0; i < selectedOptions.length; i++) {
          if (recipe.tags.includes(selectedOptions[i].value)) {
            return recipe;
          }
        }
      }
    })
    setFilteredRecipes(filterRecipes);
  }, [selectedOptions]);

  return (
    <div>
      <div id='home-container'>
        <div className='list-container'>
          <h2>Recipes</h2>
          <RecipeList recipes={filteredRecipes} />
        </div>
        <div className='list-container'>
          <h2>Memories</h2>
          <MemoryList memories={filteredMemories} />
        </div>
      </div>
    </div>
  );
}