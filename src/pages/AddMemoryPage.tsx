import { useState } from "react";
import type { MemoryFormData } from "../types/types";
import { createNewMemory } from "../utils/recipes-api";

export function AddMemoryPage() {
    const [formData, setFormData] = useState<MemoryFormData>({
        title: '',
        contents: '',
        image: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target; // Destructure name and value

        setFormData(prevFormData => ({
            ...prevFormData, // Spread existing state
            [name]: value     // Update changed field using computed property name
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createNewMemory(formData);
        setFormData({
            title: '',
            contents: '',
            image: ''
        })
    };

    return (
        <div className="memory-container">
            <form onSubmit={handleSubmit}>
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