import axios from "axios";

export async function getRecipes() {
  try {
    let token = localStorage.getItem("token");
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes`, {
      headers: {
        'Authorization': token
      }
    });
    return response.data; // The retrieved data
  } catch (error) {
    console.error('Error fetching post:', error);
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