import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import type { MemoryFormData } from "../types/types";
import { createNewMemory } from "../utils/recipes-api";
import { AuthContext } from "../context/AuthContext";

export function AddMemoryPage() {
    const authContext = useContext(AuthContext);
    const [formData, setFormData] = useState<MemoryFormData>({
        title: '',
        contents: '',
        image: ''
    });

    if (!authContext) {
        return (
            <h3>Error</h3>
        )
    }

    // Redirect to login page if not authenticated
    const { isAuthenticated } = authContext;
    if (!isAuthenticated) {
        // Redirects to the login page if the condition (isLoggedIn) is false
        return <Navigate to="/login" replace />;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target; // Destructure name and value

        setFormData(prevFormData => ({
            ...prevFormData, // Spread existing state
            [name]: value     // Update changed field using computed property name
        }));
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        createNewMemory(formData);
        alert("New memory created");
        setFormData({
            title: '',
            contents: '',
            image: ''
        });
    };

    return (
        <div className="memory-container">
            <form id="add-memory-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Memory title:</label>
                <input id="title-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" required></input>
                <label htmlFor="contents">Contents:</label>
                <textarea id="contents-input" name="contents" value={formData.contents} onChange={handleChange} placeholder="Enter contents"></textarea>
                <label htmlFor="image">Memory image:</label>
                <input id="image-input" type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Enter a link to an image"></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}