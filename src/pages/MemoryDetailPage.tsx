import { useParams } from "react-router-dom"
import type { Memory } from "../types/types";
import { useState, useEffect } from 'react';
import { getOneMemory, editMemory, deleteMemory } from "../utils/recipes-api";

export function MemoryDetailPage() {
    const { memoryId } = useParams();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [userId, setUserId] = useState<string | null>("");
    const [displayMemory, setDisplayMemory] = useState<Memory>({
        _id: "12345",
        user: "user",
        title: "title",
        contents: "contents",
        image: "image"
    });
    const [formData, setFormData] = useState<Memory>(displayMemory);

    useEffect(() => {
        setUserId(localStorage.getItem("user"));
        setFormData(displayMemory);
    }, [displayMemory]);

    useEffect(() => {
        if (userId === displayMemory.user) {
            setIsAuthorized(true);
        }
    }, [displayMemory]);

    useEffect(() => {
        getOneMemory(memoryId!).then(data => setDisplayMemory(data));
    }, []);

    const handleClick = () => {
        setIsVisible(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target; // Destructure name and value

        setFormData(prevFormData => ({
            ...prevFormData, // Spread existing state
            [name]: value     // Update changed field using computed property name
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editMemory(formData);
        setFormData({
            _id: '',
            user: '',
            title: '',
            contents: '',
            image: ''
        })
        setIsVisible(false);
    };

    const handleDelete = () => {
        deleteMemory(memoryId!);
    };

    return (
        <>
            <div>
                {(isAuthorized) && <button onClick={() => handleClick()}>Edit</button>}
                {(isAuthorized) && <button onClick={() => handleDelete()}>Delete</button>}
            </div>
            {(isVisible) && <div className='container'>
                <div className="memory-full" key={displayMemory._id}>
                    <div className="memory-head">
                        {(displayMemory.image) && <img src={displayMemory.image} />}
                        <h1>{displayMemory.title}</h1>
                        {/* <button onClick={handleFavorite}>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</button> */}
                    </div>
                    <div className="memory-body">
                        <div className="contents">
                            <h2>Contents</h2>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{displayMemory.contents}</p>
                        </div>
                    </div>
                </div>
            </div>}
            {(!isVisible) && <form onSubmit={handleSubmit}>
                <label htmlFor="title">Memory title:</label>
                <input id="title-input" type="text" name="title" value={formData.title} onChange={handleChange} placeholder={displayMemory.title} required></input>
                <label htmlFor="contents">Contents:</label>
                <textarea id="contents-input" name="contents" value={formData.contents} onChange={handleChange} placeholder={displayMemory.contents} required></textarea>
                <button type="submit">Save</button>
            </form>}
        </>
    );
}