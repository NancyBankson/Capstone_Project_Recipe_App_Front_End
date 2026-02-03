import { useState, useEffect } from "react";
import type { RecipeFormData } from "../types/types";
import { createNewRecipe } from "../utils/recipes-api";

export function AddRecipePage() {
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

    const tags = ['Casserole', 'Chocolate', 'Chicken', 'Beef', 'Fish', 'Pasta', 'Dessert'];

    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData, // Spread existing state
            tags: selectedTags    // Update changed field using computed property name
        }));
    }, [selectedTags]);

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
        })
    };

    return (
        <div className="recipe-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Recipe title:</label>
                <input id="title-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" required></input>
                <label htmlFor="category">Category:</label>
                <select id="category-input" name="category" value={formData.category} onChange={handleChange}>
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
                        <input type="checkbox" value={tag} checked={selectedTags.includes(tag)} onChange={handleCheckboxChange} />
                        {tag}
                    </label>
                ))}
                <label htmlFor="source">Source:</label>
                <input id="source-input" type="text" name="source" value={formData.source} onChange={handleChange} placeholder="Enter source"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}