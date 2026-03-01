import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../utils/recipes-api";
import type { NewPasswordFormData } from "../types/types";

export function ChangePasswordPage() {
    // const [isChangingPassword, setIsChangingPassword] = useState(false);
    const navigate = useNavigate();
    const [newPasswordFormData, setnewPasswordFormData] = useState<NewPasswordFormData>({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handlePasswordChangeEntry = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target; // Destructure name and value

        setnewPasswordFormData(prevnewPasswordFormData => ({
            ...prevnewPasswordFormData, // Spread existing state
            [name]: value     // Update changed field using computed property name
        }));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newPasswordFormData.newPassword != newPasswordFormData.confirmNewPassword) {
            alert("Passwords must match");
        } else {
            changePassword(newPasswordFormData);
            navigate("/login"); // Navigate to login page
        }
    };

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handlePasswordChange}>
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input id="old-password-input" type="password" name="oldPassword" value={newPasswordFormData.oldPassword} onChange={handlePasswordChangeEntry} placeholder="Enter old password" required></input>
                    <label htmlFor="newPassword">New Password:</label>
                    <input id="new-password-input" type="password" name="newPassword" value={newPasswordFormData.newPassword} onChange={handlePasswordChangeEntry} placeholder="Enter new password" required></input>
                    <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                    <input id="confirm-new-password-input" type="password" name="confirmNewPassword" value={newPasswordFormData.confirmNewPassword} onChange={handlePasswordChangeEntry} placeholder="Reenter new password" required></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}