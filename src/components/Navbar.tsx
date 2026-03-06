import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import Select from "react-select";
import type { TagType } from "../types/types";
import type { MultiValue } from "react-select";

export function Navbar() {
    const authContext = useContext(AuthContext);
    const searchContext = useContext(SearchContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Clear search bar on page change
    useEffect(() => {
        setSelectedOptions([]);
        onSearchChange("");
        onFilterChange("");
    }, [location.pathname]);

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

    const { onSearchChange, searchValue, onFilterChange, filterValue, selectedOptions, setSelectedOptions } = searchContext;

    const { logout, isAuthenticated, user } = authContext;

    const options: TagType[] = [
        { label: 'Casserole', value: 'Casserole' },
        { label: 'Chocolate', value: 'Chocolate' },
        { label: 'Chicken', value: 'Chicken' },
        { label: 'Beef', value: 'Beef' },
        { label: 'Fish', value: 'Fish' },
        { label: 'Pasta', value: 'Pasta' },
        { label: 'Dessert', value: 'Dessert' }
    ]

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

    const handleTagChange = (selected: MultiValue<TagType>) => {
        setSelectedOptions([...selected]);
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
                <Select
                    options={options}
                    isMulti
                    value={selectedOptions}
                    onChange={handleTagChange}
                />
                <div id="log-area">
                    {(isAuthenticated) && <h4>Welcome, {user.username}</h4>}
                    {(!isAuthenticated) && <button><NavLink to="/login">Log In</NavLink></button>}
                    {(isAuthenticated) && <button onClick={() => handleClick()}>Log Out</button>}
                    {(isAuthenticated) && <button id="change-password-button"><NavLink to="/change-password">Change Password</NavLink></button>}
                </div>
            </div>
        </nav>
    )
}