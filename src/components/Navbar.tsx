import { NavLink, useSearchParams, useNavigate } from "react-router-dom"
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Navbar() {
    const [searchValue, setSearchValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

   if (!authContext) {
        return (
            <h3>Error</h3>
        )
    }

    const { logout } = authContext;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update state when the input changes
        setSearchValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearchParams({ query: searchValue });
        navigate(`/search?query=${searchValue}`);
        setSearchValue("");
    };

    const handleClick = () => {
        logout();
    };

    // Add logic so userId can be used for link to My Page
    const userId = localStorage.getItem("user");

    return (
        <nav>
            <ul>
                <li><NavLink to="/home" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', })}>Home</NavLink></li>
                <li><NavLink to={`/${userId}`} style={({ isActive }) => ({ color: isActive ? 'red' : 'black', })}>My Page</NavLink></li>
                <li><NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', })}>Log In</NavLink></li>
                <li><NavLink to="/add-recipe" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', })}>Add Recipe</NavLink></li>
                <li><NavLink to="/add-memory" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', })}>Add Memory</NavLink></li>
            </ul>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input id="search-bar" type="text" name="search" value={searchValue} onChange={handleChange} placeholder="Enter recipe"></input>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => handleClick()}>Log Out</button>
        </nav>
    )
}