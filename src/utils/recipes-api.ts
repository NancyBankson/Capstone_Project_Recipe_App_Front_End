import axios from "axios";

export async function getRecipes() {
  try {
    console.log(`${import.meta.env.VITE_API_URL}/api/recipes`);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/recipes`);

    if (!response.ok) throw new Error("API Error! Response was not ok.");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      email: email,
      password: password
    });
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