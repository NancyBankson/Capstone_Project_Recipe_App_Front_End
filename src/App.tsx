import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ContributorPage } from './pages/ContributorPage';
import './App.css'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/:userId" element={<ContributorPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/search" element={<SearchPage />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
