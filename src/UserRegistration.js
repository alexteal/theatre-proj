import React, { useState } from 'react';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = () => {
    // Handle user registration logic
    console.log('Registration Data:', formData);
  };

  return (
    <div className="user-registration">
      <h2>User Registration</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default UserRegistration;
