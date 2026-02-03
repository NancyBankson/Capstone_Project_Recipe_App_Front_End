import axios from "axios";
import type { RecipeFormData, Recipe } from "../types/types";

export async function getRecipes() {
  try {
    // Gets all recipes
    let token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data; // The retrieved data
  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
}

export async function getOneRecipe(recipeId: string) {
  try {
    // Gets a single recipe
    let token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes/${recipeId}`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data; // The retrieved data
  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
}

export async function createNewRecipe(formData: RecipeFormData) {
  try {
    // Creates a new recipe
    console.log(formData);
    let token = localStorage.getItem("token");
    console.log(`${import.meta.env.VITE_API_URL}/api/recipes`);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/recipes`, formData, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
  }
}

export async function editRecipe(formData: Recipe) {
  try {
    // Edits a recipe
    let token = localStorage.getItem("token");
    console.log(`${import.meta.env.VITE_API_URL}/api/recipes/${formData._id}`);
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/recipes/${formData._id}`, formData, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing recipe:', error);
  }
}

export async function deleteRecipe(recipeId: string) {
  try {
    // Deletes a recipe
    let token = localStorage.getItem("token");
    console.log(`${import.meta.env.VITE_API_URL}/api/recipes/${recipeId}`);
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/recipes/${recipeId}`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
}

export async function login(email: string, password: string) {
  try {
    console.log(`${import.meta.env.VITE_API_URL}/api/users/login`);
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      email: email,
      password: password
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", response.data.user._id);
    console.log('Logged in', response.data);
  } catch (error) {
    console.error('Error logging in', error);
  }
}

export async function register(username: string, email: string, password: string) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
      username: username,
      email: email,
      password: password
    });
    console.log('Registered', response.data);
  } catch (error) {
    console.error('Error registering', error);
  }
}