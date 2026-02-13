import { useState, useEffect, useContext } from 'react';
import { getRecipes, getMemories } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import { MemoryList } from '../components/MemoryList';
import { SearchContext } from '../context/SearchContext';
import type { Recipe } from '../types/types';

export function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [memories, setMemories] = useState(null);
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    return (
      <h3>Error</h3>
    )
  }

  const { searchValue, filterValue } = searchContext;

  useEffect(() => {
    getRecipes().then(data => setRecipes(data));
  }, []);

  useEffect(() => {
    getMemories().then(data => setMemories(data));
  }, []);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

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