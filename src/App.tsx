import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ContributorPage } from './pages/ContributorPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { MemoryDetailPage } from './pages/MemoryDetailPage';
import { AddRecipePage } from './pages/AddRecipePage';
import { AddMemoryPage } from './pages/AddMemoryPage';
import { AuthContext } from './context/AuthContext';
import { NotFoundPage } from './pages/NotFoundPage';
import { RootPage } from './pages/RootPage';
import type { User } from './types/types';
import './App.css'
import { SearchContext } from './context/SearchContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>({
    _id: '',
    username: '',
    email: ''
  });
  const navigate = useNavigate();

  function onSearchChange(searchText: string) {
    setSearchValue(searchText);
  }

  async function login(email: string, password: string) {
    try {
      console.log(`${import.meta.env.VITE_API_URL}/api/users/login`);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        email: email,
        password: password
      });
      console.log(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user._id);
      console.log('Logged in', response.data);
      setIsAuthenticated(prevIsAuthenticated => (prevIsAuthenticated === false ? true : false));
      setToken(response.data.token);
      setUser(response.data.user);
      navigate(`/${response.data.user._id}`); // Navigate to user's page
    } catch (error) {
      console.error('Error logging in', error);
      alert("Incorrect name or password, try again");
    }
  }

  async function logout() {
    try {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      console.log('Logged out');
      setIsAuthenticated(prevIsAuthenticated => (prevIsAuthenticated === false ? true : false));
      setToken("");
      setUser({
        _id: '',
        username: '',
        email: ''
      });
    } catch (error) {
      console.error('Error logging in', error);
    }
  }

  return (
    <>
      <div>
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
          <SearchContext.Provider value={{ onSearchChange, searchValue }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<RootPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/:userId" element={<ContributorPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/add-recipe" element={<AddRecipePage />} />
              <Route path="/add-memory" element={<AddMemoryPage />} />
              {/* <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/favorites" element={<FavoritesPage />} /> */}
              <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
              <Route path="/memory/:memoryId" element={<MemoryDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
              {/* <Route path="/search" element={<SearchPage />} /> */}
            </Routes>
          </SearchContext.Provider>
        </AuthContext.Provider>
      </div>
    </>
  )
}

export default App
