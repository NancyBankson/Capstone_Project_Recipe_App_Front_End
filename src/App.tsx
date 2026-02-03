import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { ContributorPage } from './pages/ContributorPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { MemoryDetailPage } from './pages/MemoryDetailPage';
import { AddRecipePage } from './pages/AddRecipePage';
import { AddMemoryPage } from './pages/AddMemoryPage';
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
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/add-memory" element={<AddMemoryPage />} />
          {/* <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/favorites" element={<FavoritesPage />} /> */}
          <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/memory/:memoryId" element={<MemoryDetailPage />} />
          {/* <Route path="/search" element={<SearchPage />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
