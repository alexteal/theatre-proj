import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, sendResetEmail } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { fetchUserData } from "../../dataService";

const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential, "check123");
                // Signed in
                const user = userCredential.user;

                fetchUserData(user.uid)
                    .then((data) => {
                        if (data) {
                            console.log(data);
                            dispatch({
                                type: "LOGIN",
                                payload: { ...data, uid: user.uid },
                            });
                            if (data.isAdmin) {
                                navigate("/manage-movies");
                            } else {
                                navigate("/");
                            }
                        }
                    })
                    .catch((err) => setError("Error fetching user data."));
            })
            .catch((error) => {
                setError("Wrong email or password!");
            });
    };

    const handleForgotPassword = () => {
        if (!email.trim()) {
            setError("Email field is required.");
            return;
        }

        sendResetEmail(email)
            .then(() => {
                setResetEmailSent(true);
            })
            .catch((error) => {
                console.error("Error sending reset email:", error);
                setError("Failed to send reset email.");
            });
    };

    return (
        <div className="login">
            <h2>Cinema E-Booking System</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <strong>{error}</strong>}

                <div className="other-buttons">
                    <Link to="/register" className="register-link">
                        Don't have an account? Register
                    </Link>
                    <button
                        className="forgot-password"
                        type="button"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </button>
                </div>

                {resetEmailSent && (
                    <strong>
                        Password reset email sent! Please check your inbox.
                    </strong>
                )}
            </form>
        </div>
    );
};

export default Login;
