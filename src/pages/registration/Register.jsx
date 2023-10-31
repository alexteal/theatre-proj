import { useState } from "react";
import { register, sendVerificationEmail } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { saveUserData } from "../../dataService";
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checked, setChecked] = useState(false);

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleRegister = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    register(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          registerForPromotion: checked,
          active: true,
        };
        saveUserData(user.uid, userData)
          .then(() => {
            console.log("User data saved successfully!");
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
          });
        sendVerificationEmail(user)
          .then(() => {
            alert(
              "Verification email sent. Please check you registered email!"
            );
          })
          .catch((error) => {
            console.error("Failed to send verification email:", error);
          });
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="register">
      <h1 className="register-heading">Create an Account</h1>

      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheckboxChange}
          />
          <span>Register for promotion?</span>
        </div>
        <button type="submit">Register</button>
        {error && <strong>{error}</strong>}
      </form>
      <Link to="/login" className="login-link">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Register;
