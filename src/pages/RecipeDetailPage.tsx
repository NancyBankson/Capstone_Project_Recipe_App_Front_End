import { useParams, Navigate, useNavigate } from "react-router-dom"
import type { Recipe } from "../types/types";
import { useState, useEffect, useContext } from 'react';
import { getOneRecipe, editRecipe, deleteRecipe } from "../utils/recipes-api";
import { AuthContext } from "../context/AuthContext";

export function RecipeDetailPage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { recipeId } = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [userId, setUserId] = useState<string | null>("");
  const [displayRecipe, setDisplayRecipe] = useState<Recipe>({
    _id: "12345",
    user: "user",
    title: "title",
    category: "category",
    ingredients: "ingredients",
    instructions: "instructions",
    image: "image",
    tags: ["tags"],
    source: "source"
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagString, setTagString] = useState("");
  const [formData, setFormData] = useState<Recipe>(displayRecipe);

  const tags = ['Casserole', 'Chocolate', 'Chicken', 'Beef', 'Fish', 'Pasta', 'Dessert'];

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData, // Spread existing state
      tags: selectedTags    // Update changed field using computed property name
    }));
  }, [selectedTags]);

  useEffect(() => {
    setUserId(localStorage.getItem("user"));
    setFormData(displayRecipe);
  }, [displayRecipe]);

  useEffect(() => {
    if (userId === displayRecipe.user) {
      setIsAuthorized(true);
    }
  }, [displayRecipe]);

  useEffect(() => {
    getOneRecipe(recipeId!).then(data => setDisplayRecipe(data));
  }, []);

  useEffect(() => {
     setDisplayRecipe(prevDisplayRecipe => ({
      ...prevDisplayRecipe, tags: selectedTags
    }));
  }, [selectedTags]);

  useEffect(() => {
    let newTagString: string = displayRecipe.tags[0];
    for (let i = 1; i < displayRecipe.tags.length; i++) {
      newTagString = newTagString + ", " + displayRecipe.tags[i];
    }
    setTagString(newTagString);
  }, [displayRecipe]);

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

  const handleClick = () => {
    setIsVisible(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTags(prevTags => ([...prevTags, value]));
    } else {
      setSelectedTags(prevTags => prevTags.filter(tag => tag != value));
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target; // Destructure name and value

    setFormData(prevFormData => ({
      ...prevFormData, // Spread existing state
      [name]: value     // Update changed field using computed property name
    }));
    setDisplayRecipe(prevDisplayRecipe => ({
      ...prevDisplayRecipe, [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // setSelectedTags([]);
    event.preventDefault();
    editRecipe(formData);
    setFormData({
      _id: '',
      user: '',
      title: '',
      category: '',
      ingredients: '',
      instructions: '',
      image: '',
      tags: selectedTags,
      source: ''
    })
    setIsVisible(true);
  };

  const handleDelete = () => {
    deleteRecipe(recipeId!);
    alert("Recipe deleted");
    navigate(`/${displayRecipe.user}`);
  };

  return (
    <>
    <div className="container">
       <div id="recipe-buttons">
        {(isAuthorized) && <button onClick={() => handleClick()}>Edit</button>}
        {(isAuthorized) && <button onClick={() => handleDelete()}>Delete</button>}
      </div>
    </div>     
      {(isVisible) && <div className='container'>
        <div className="recipe-full" key={displayRecipe._id}>
          <div className="recipe-head">
            {(displayRecipe.image) && <img src={displayRecipe.image} />}
            <h1>{displayRecipe.title}</h1>

            {/* <button onClick={handleFavorite}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</button> */}
          </div>
          <div className="recipe-body">
            <div className="ingredients">
              <h2 className="header-text">Ingredients</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>{displayRecipe.ingredients}</p>
            </div>
            <h2 className="header-text">Instructions</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{displayRecipe.instructions}</p>
            <h3 className="header-text">Category: {displayRecipe.category}</h3>
            <h3 className="header-text">Tags: {tagString}</h3>
            {(displayRecipe.source) && <h3>Source: <a href={displayRecipe.source}>{displayRecipe.source}</a></h3>}
          </div>
        </div>
      </div>}
      {(!isVisible) && <div className="recipe-container">
        <form id="add-recipe-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Recipe title:</label>
          <input id="title-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder={displayRecipe.title} required></input>
          <label htmlFor="category">Category:</label>
          <select id="category-input" defaultValue={displayRecipe.category} name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Side Dish">Side Dish</option>
            <option value="Main Dish">Main Dish</option>
            <option value="Dessert">Dessert</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Baked Good">Baked Good</option>
          </select>
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea id="ingredients-input" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder={displayRecipe.ingredients} required></textarea>
          <label htmlFor="instructions">Instructions:</label>
          <textarea id="instructions-input" name="instructions" value={formData.instructions} onChange={handleChange} placeholder={displayRecipe.instructions} required></textarea>
          <label htmlFor="tags">Tags:</label>
          {tags.map((tag) => (
            <label key={tag}>
              <input id="checkbox" type="checkbox" value={tag} checked={selectedTags.includes(tag)} onChange={handleCheckboxChange} />
              {tag}
            </label>
          ))}
          <label htmlFor="source">Source:</label>
          <input id="source-input" type="text" name="source" value={formData.source} onChange={handleChange} placeholder={displayRecipe.source}></input>
          <button type="submit">Save</button>
        </form>
      </div>}
    </>
  );
}