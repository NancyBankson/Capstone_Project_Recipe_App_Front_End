import axios from "axios";
import type { RecipeFormData, Recipe, MemoryFormData, Memory } from "../types/types";

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
    let token = localStorage.getItem("token");
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

export async function getMemories() {
  try {
    // Gets all memories
    let token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/memories`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data; // The retrieved data
  } catch (error) {
    console.error('Error fetching memory:', error);
  }
}

export async function getOneMemory(memoryId: string) {
  try {
    // Gets a single memory
    let token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/memories/${memoryId}`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data; // The retrieved data
  } catch (error) {
    console.error('Error fetching memory:', error);
  }
}

export async function createNewMemory(formData: MemoryFormData) {
  try {
    // Creates a new recipe
    let token = localStorage.getItem("token");
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/memories`, formData, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding memory:', error);
  }
}

export async function editMemory(formData: Memory) {
  try {
    // Edits a memory
    let token = localStorage.getItem("token");
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/memories/${formData._id}`, formData, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing memory:', error);
  }
}

export async function deleteMemory(memoryId: string) {
  try {
    // Deletes a memory
    let token = localStorage.getItem("token");
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/memories/${memoryId}`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting memory:', error);
  }
}

// Logic moved to App.tsx for AuthContext
// export async function login(email: string, password: string) {
//   try {
//     console.log(`${import.meta.env.VITE_API_URL}/api/users/login`);
//     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
//       email: email,
//       password: password
//     });
//     localStorage.setItem("token", response.data.token);
//     localStorage.setItem("user", response.data.user._id);
//     console.log('Logged in', response.data);
//   } catch (error) {
//     console.error('Error logging in', error);
//   }
// }

// export async function logout() {
//   try {
//     let token = localStorage.getItem("token");
//     console.log(`${import.meta.env.VITE_API_URL}/api/users/logout`);
//     const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
//       headers: {
//         'Authorization': token
//       }
//     });
//     localStorage.setItem("token", "");
//     localStorage.setItem("user", "");
//     console.log('Logged out', response.data);
//   } catch (error) {
//     console.error('Error logging out', error);
//   }
// }

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