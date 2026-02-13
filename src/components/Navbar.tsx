import { NavLink, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";

export function Navbar() {
    const authContext = useContext(AuthContext);
    const searchContext = useContext(SearchContext);
    const navigate = useNavigate();

    if (!authContext) {
        return (
            <h3>Error</h3>
        )
    }

    if (!searchContext) {
        return (
            <h3>Error</h3>
        )
    }

    const { onSearchChange, onFilterChange, searchValue, filterValue } = searchContext;

    const { logout, isAuthenticated, user } = authContext;

    const handleClick = () => {
        logout();
        navigate("/login"); // Navigate to login page
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newText = event.target.value;
        onSearchChange(newText);
    }

      const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newText = event.target.value;
        onFilterChange(newText);
    }

    // Add logic so userId can be used for link to My Page
    const userId = localStorage.getItem("user");

    return (
        <nav>
            <div id="nav-container">
                <ul>
                    <li><NavLink to="/home" style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>Home</NavLink></li>
                    <li><NavLink to={`/${userId}`} style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>My Page</NavLink></li>
                    <li><NavLink to="/add-recipe" style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>Add Recipe</NavLink></li>
                    <li><NavLink to="/add-memory" style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>Add Memory</NavLink></li>
                </ul>
                <input id="search-bar" type="text" name="search" value={searchValue} onChange={handleChange} placeholder="Search recipes"></input>
                <select id="category-input" name="category" value={filterValue} onChange={handleFilter} required>
                    <option value="">Filter by Category</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Side Dish">Side Dish</option>
                    <option value="Main Dish">Main Dish</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Baked Good">Baked Good</option>
                </select>
                <div id="log-area">
                    {(isAuthenticated) && <h4>Welcome, {user.username}</h4>}
                    {(!isAuthenticated) && <button><NavLink to="/login">Log In</NavLink></button>}
                    {(isAuthenticated) && <button onClick={() => handleClick()}>Log Out</button>}
                </div>
            </div>
        </nav>
    )
}