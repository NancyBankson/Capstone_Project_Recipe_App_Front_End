import { useState, useEffect } from 'react';
import { getRecipes, getMemories } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';
import { MemoryList } from '../components/MemoryList';

export function HomePage() {
  const [recipes, setRecipes] = useState(null);
  const [memories, setMemories] = useState(null);

  useEffect(() => {
    getRecipes().then(data => setRecipes(data));
  }, []);

  useEffect(() => {
    getMemories().then(data => setMemories(data));
  }, []);

  return (
    <div>
      <div id='home-container'>
        <div className='list-container'>
          <h2>Recipes</h2>
          <RecipeList recipes={recipes} />
        </div>
        <div className='list-container'>
          <h2>Memories</h2>
          <MemoryList memories={memories} />
        </div>
      </div>
    </div>
  );
}