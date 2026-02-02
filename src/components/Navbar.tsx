import { NavLink, useSearchParams, useNavigate } from "react-router-dom"
import { useState } from "react";

export function Navbar() {
    const [searchValue, setSearchValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

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

    // Add logic so userId can be used for link to My Page
    const userId = localStorage.getItem("user");

    return (
        <nav>
            <ul>
                <li><NavLink to="/home" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', })}>Home</NavLink></li>
                <li><NavLink to={`/${userId}`} style={({ isActive }) => ({ color: isActive ? 'red' : 'black', })}>My Page</NavLink></li>
                <li><NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', })}>Log In</NavLink></li>
            </ul>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input id="search-bar" type="text" name="search" value={searchValue} onChange={handleChange} placeholder="Enter recipe"></input>
                <button type="submit">Submit</button>
            </form>
        </nav>
    )
}