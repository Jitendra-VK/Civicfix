import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import api from "../services/api";
import "./Auth.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.post("/auth/register", {
                name,
                email,
                password,
            });

            setSuccess(true);

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <Link to="/" className="back-home">
                <ArrowLeft size={18} />
                Back to CivicFix
            </Link>

            <div className="auth-card">

                <div className="auth-logo">
                    🏙️
                </div>

                <h1>Create account</h1>

                <p className="auth-subtitle">
                    Join your community and start reporting issues.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        Account created successfully! Redirecting...
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="auth-group">

                        <label>Full Name</label>

                        <div className="input-wrapper">

                            <User size={18} />

                            <input
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                        </div>

                    </div>

                    <div className="auth-group">

                        <label>Email Address</label>

                        <div className="input-wrapper">

                            <Mail size={18} />

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>

                    </div>

                    <div className="auth-group">

                        <label>Password</label>

                        <div className="input-wrapper">

                            <Lock size={18} />

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>

                </form>

                <p className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">
                        Sign in
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;