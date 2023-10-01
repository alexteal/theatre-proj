import React, { useState, useEffect } from 'react';
import './Css/Edit.css';

function EditUserProfile() {
    const [userProfile, setUserProfile] = useState({
        id: 1, // Assuming you have a user ID
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        // Add more user profile properties as needed
    });

    useEffect(() => {
        // Fetch user profile details from your API or database here and update the 'userProfile' state
        // Example API call:
        // fetch(`/api/users/${userProfile.id}`)
        //   .then(response => response.json())
        //   .then(data => setUserProfile(data))
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserProfile({ ...userProfile, [name]: value });
    };

    const done = () => {
        alert("Changes saved.");
    };

    // const handleSave = () => {

    // };

    return (
        <div className="edit-user-profile">
            <h2>Edit User Profile</h2>
            <form>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={userProfile.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={userProfile.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={userProfile.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Add more input fields for other user profile properties */}
                <a href='/'>
                    <button type="button" onClick={done}>
                        Save
                    </button>
                </a>
            </form>
        </div>
    );
}

export default EditUserProfile;
