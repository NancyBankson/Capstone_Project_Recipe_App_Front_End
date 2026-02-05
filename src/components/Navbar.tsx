import { NavLink } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Navbar() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return (
            <h3>Error</h3>
        )
    }

    const { logout, isAuthenticated, user } = authContext;

    const handleClick = () => {
        logout();
    };

    // Add logic so userId can be used for link to My Page
    const userId = localStorage.getItem("user");

    return (
        <nav>
            <div id="nav-container">
                <ul>
                    <li><NavLink to="/home" style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>Home</NavLink></li>
                    <li><NavLink to={`/${userId}`} style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>My Page</NavLink></li>
                    {/* <li><NavLink to="/login" style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>Log In</NavLink></li> */}
                    <li><NavLink to="/add-recipe" style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>Add Recipe</NavLink></li>
                    <li><NavLink to="/add-memory" style={({ isActive }) => ({ color: isActive ? '#73877B' : 'hsl(200, 15%, 8%)', })}>Add Memory</NavLink></li>
                </ul>
                <div id="log-area">
                    {(isAuthenticated) && <h4>Welcome, {user.username}</h4>}
                    {(!isAuthenticated) && <button><NavLink to="/login">Log In</NavLink></button>}
                    {(isAuthenticated) && <button onClick={() => handleClick()}>Log Out</button>}
                </div>
            </div>
        </nav>
    )
}