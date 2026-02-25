import { useContext, useState } from "react";
import { register } from "../utils/recipes-api";
import type { LogInFormData, RegistrationFormData } from "../types/types";
import { AuthContext } from "../context/AuthContext";

export function LoginPage() {
    const authContext = useContext(AuthContext);
    const [isRegistered, setIsRegistered] = useState(true);
    const [logInFormData, setLogInFormData] = useState<LogInFormData>({
        email: '',
        password: ''
    });
    const [registrationFormData, setRegistrationFormData] = useState<RegistrationFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    if (!authContext) {
        return (
            <h3>Error</h3>
        )
    }

    const { login } = authContext;

    const handleLogInChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // Destructure name and value

        setLogInFormData(prevLogInFormData => ({
            ...prevLogInFormData, // Spread existing state
            [name]: value     // Update changed field using computed property name
        }));
    };

    const handleLogIn = (event: React.ChangeEvent<HTMLFormElement>) => {
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

    const handleRegister = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (registrationFormData.password != registrationFormData.confirmPassword) {
            alert("Passwords must match");
        } else {
            register(registrationFormData.username, registrationFormData.email, registrationFormData.password);
            setIsRegistered(true);
        }
    };

    const handleClick = () => {
        setIsRegistered(prevIsRegistered => (prevIsRegistered === false ? true : false));
    }

    return (
        <>

            <div className="login-container">
                {isRegistered && <form className="login-form" onSubmit={handleLogIn}>
                    <label htmlFor="email">Email Address:</label>
                    <input id="email-input" type="email" name="email" value={logInFormData.email} onChange={handleLogInChange} placeholder="Enter email" required></input>
                    <label htmlFor="password">Enter Password:</label>
                    <input id="password-input" type="password" name="password" value={logInFormData.password} onChange={handleLogInChange} placeholder="Enter password" required></input>
                    <button type="submit">Log In</button>
                </form>}
                {!isRegistered && <form className="login-form" onSubmit={handleRegister}>
                    <label htmlFor="username">Username:</label>
                    <input id="username-input" type="text" name="username" value={registrationFormData.username} onChange={handleRegisterChange} placeholder="Enter username" required></input>
                    <label htmlFor="email">Email Address:</label>
                    <input id="email-input" type="email" name="email" value={registrationFormData.email} onChange={handleRegisterChange} placeholder="Enter email" required></input>
                    <label htmlFor="password">Password:</label>
                    <input id="password-input" type="password" name="password" value={registrationFormData.password} onChange={handleRegisterChange} placeholder="Enter password" required></input>
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input id="confirm-password-input" type="password" name="confirmPassword" value={registrationFormData.confirmPassword} onChange={handleRegisterChange} placeholder="Reenter password" required></input>
                    <button type="submit">Register</button>
                </form>}
            </div>
            <div id="registration">
                <label>Not Registered?</label>
                <button onClick={() => handleClick()}>Reigster Here</button>
                {(!isRegistered) && <button onClick={() => handleClick()}>Log In</button>}
            </div>
        </>
    )
}