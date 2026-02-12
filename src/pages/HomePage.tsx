import { useState, useEffect, useContext } from 'react';
import { getRecipes, getMemories } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import { MemoryList } from '../components/MemoryList';
import { SearchContext } from '../context/SearchContext';
import type { Recipe } from '../types/types';

export function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFileteredRecipes] = useState<Recipe[]>(recipes);
  const [memories, setMemories] = useState(null);
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    return (
      <h3>Error</h3>
    )
  }

  const { searchValue } = searchContext;

  useEffect(() => {
    getRecipes().then(data => setRecipes(data));
  }, []);

  useEffect(() => {
    getMemories().then(data => setMemories(data));
  }, []);

    useEffect(() => {
    const filterRecipes = recipes.filter(recipe => {
      if (searchValue === "") {
        return recipe;
      } else if (recipe.title.toLowerCase().includes(searchValue!.toLowerCase())) {
        return recipe;
      }
    })
    setFileteredRecipes(filterRecipes);
    }, [searchValue]);

  return (
    <div>
      <div id='home-container'>
        <div className='list-container'>
          <h2>Recipes</h2>
          <RecipeList recipes={filteredRecipes} />
        </div>
        <div className='list-container'>
          <h2>Memories</h2>
          <MemoryList memories={memories} />
        </div>
      </div>
    </div>
  );
}