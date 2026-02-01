// import type { Categories } from '../../types';
// import { useFetch } from '../../hooks/useFetch';
// import { Link } from 'react-router-dom';
// import { Spinner } from '../../components/Spinner';
// import { ErrorMessage } from '../../components/ErrorMessage';
import { useState, useEffect } from 'react';
import { getRecipes } from '../utils/recipes-api';
import { RecipeList } from '../components/RecipeList';

export function HomePage() {

  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    getRecipes().then(data => setRecipes(data));
  }, []);

//   const { data, loading, error } = useFetch<{ categories: Categories[] }>("https://www.themealdb.com/api/json/v1/1/categories.php");

//   if (loading) {
//     return (
//       <div className="loading">
//         Loading recipes...
//         <Spinner />
//       </div>
//     )
//   }
//   if (error) {
//     return (
//       <div>
//         <ErrorMessage />
//         Error: {error.message}
//       </div>
//     )
//   }

  return (
    <div>
      <h2>Recipes</h2>
      <div className='container'>
        <RecipeList recipes={recipes} />
        {/* {data?.categories.map((category) => {
          return (
            <div className="category-card" key={category.idCategory}>
              <img src={category.strCategoryThumb} />
              <Link to={`/category/${category.strCategory}`}>{category.strCategory}</Link>
              <p>{category.strCategoryDescription}</p>
            </div>
          );
        })} */}
        <h2>Contributors</h2>
      </div>
    </div>
  );
}