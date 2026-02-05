import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import type { RecipeFormData } from "../types/types";
import { createNewRecipe } from "../utils/recipes-api";
import { AuthContext } from "../context/AuthContext";

export function AddRecipePage() {
    const authContext = useContext(AuthContext);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [formData, setFormData] = useState<RecipeFormData>({
        title: '',
        category: '',
        ingredients: '',
        instructions: '',
        image: '',
        tags: selectedTags,
        source: ''
    });
    const [checkboxes, setCheckboxes] = useState({
        Casserole: false,
        Chocolate: false,
        Chicken: false,
        Beef: false,
        Fish: false,
        Pasta: false,
        Dessert: false
    });

    const tags = ['Casserole', 'Chocolate', 'Chicken', 'Beef', 'Fish', 'Pasta', 'Dessert'];

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData, // Spread existing state
            tags: selectedTags    // Update changed field using computed property name
        }));
    }, [selectedTags]);

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
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createNewRecipe(formData);
        setFormData({
            title: '',
            category: '',
            ingredients: '',
            instructions: '',
            image: '',
            tags: selectedTags,
            source: ''
        });
        setSelectedTags([]);
        setCheckboxes({
            Casserole: false,
            Chocolate: false,
            Chicken: false,
            Beef: false,
            Fish: false,
            Pasta: false,
            Dessert: false
        });
        alert("Recipe added");
    };

    return (
        <div className="recipe-container">
            <form id="add-recipe-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Recipe title:</label>
                <input id="title-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" required></input>
                <label htmlFor="category">Category:</label>
                <select id="category-input" name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Side Dish">Side Dish</option>
                    <option value="Main Dish">Main Dish</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Baked Good">Baked Good</option>
                </select>
                <label htmlFor="ingredients">Ingredients:</label>
                <textarea id="ingredients-input" name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Enter ingredients" required></textarea>
                <label htmlFor="instructions">Instructions:</label>
                <textarea id="instructions-input" name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Enter instructions" required></textarea>
                <label htmlFor="tags">Tags:</label>
                {tags.map((tag) => (
                    <label key={tag}>
                        <input id="checkbox" type="checkbox" name={tag} value={tag} checked={selectedTags.includes(tag)} onChange={handleCheckboxChange} />
                        {tag}
                    </label>
                ))}
                <label htmlFor="image">Image:</label>
                <input id="image-input" type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Enter a url with link to image"></input>
                <label htmlFor="source">Source:</label>
                <input id="source-input" type="text" name="source" value={formData.source} onChange={handleChange} placeholder="Enter source"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}