import { useState } from "react";
import { login, register } from "../utils/recipes-api";
import type { LogInFormData, RegistrationFormData } from "../types/types";

export function LoginPage() {
    const [isRegistered, setIsRegistered] = useState(true);
    const [logInFormData, setLogInFormData] = useState<LogInFormData>({
        email: '',
        password: ''
    });
    const [registrationFormData, setRegistrationFormData] = useState<RegistrationFormData>({
        username: '',
        email: '',
        password: ''
    });

    const handleLogInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // Destructure name and value

        setLogInFormData(prevLogInFormData => ({
            ...prevLogInFormData, // Spread existing state
            [name]: value     // Update changed field using computed property name
        }));
    };

    const handleLogIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(logInFormData.email, logInFormData.password);
    };

    const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // Destructure name and value

        setRegistrationFormData(prevRegistrationFormData => ({
            ...prevRegistrationFormData, // Spread existing state
            [name]: value     // Update changed field using computed property name
        }));
    };

    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        register(registrationFormData.username, registrationFormData.email, registrationFormData.password);
        setIsRegistered(true);
    };

    const handleClick = () => {
        setIsRegistered(false);
    }

    return (
        <>
            {isRegistered && <form onSubmit={handleLogIn}>
                <label htmlFor="email">Email Address:</label>
                <input id="email-input" type="email" name="email" value={logInFormData.email} onChange={handleLogInChange} placeholder="Enter email" required></input>
                <label htmlFor="password">Task description:</label>
                <input id="password-input" type="text" name="password" value={logInFormData.password} onChange={handleLogInChange} placeholder="Enter password" required></input>
                <button type="submit">Log In</button>
            </form>}
            {!isRegistered && <form onSubmit={handleRegister}>
                <label htmlFor="username">Username:</label>
                <input id="username-input" type="text" name="username" value={registrationFormData.username} onChange={handleRegisterChange} placeholder="Enter username" required></input>
                <label htmlFor="email">Email Address:</label>
                <input id="email-input" type="email" name="email" value={registrationFormData.email} onChange={handleRegisterChange} placeholder="Enter email" required></input>
                <label htmlFor="password">Task description:</label>
                <input id="password-input" type="text" name="password" value={registrationFormData.password} onChange={handleRegisterChange} placeholder="Enter password" required></input>
                <button type="submit">Register</button>
            </form>}
            <label>Not Registered?</label>
            <button onClick={() => handleClick()}>Reigster Here</button>
        </>
    )
}