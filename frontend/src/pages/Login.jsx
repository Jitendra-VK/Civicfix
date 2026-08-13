import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowLeft, Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import "./Auth.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email: email.trim(),
                password: password,
            });

            localStorage.setItem(
                "access_token",
                response.data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            if (response.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            console.error("LOGIN ERROR:", err);

            setError(
                err.response?.data?.detail ||
                "Login failed. Please check your email and password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {/* TOP BRAND */}
            <div className="auth-brand">
                <div className="brand-icon">🏙️</div>
                <span>CivicFix</span>
            </div>

            {/* BACK LINK */}
            <Link to="/" className="back-home">
                <ArrowLeft size={18} />
                Back to CivicFix
            </Link>

            {/* RIGHT TOP TEXT */}
            <div className="community-text">
                🛡️ Building a better community
            </div>

            {/* LOGIN CARD */}
            <div className="auth-card">

                <div className="auth-logo">
                    🏙️
                </div>

                <h1>Welcome back</h1>

                <p className="auth-subtitle">
                    Sign in to manage your civic reports.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* EMAIL */}
                    <div className="auth-group">

                        <label>Email Address</label>

                        <div className="input-wrapper">

                            <Mail size={20} />

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />

                        </div>

                    </div>

                    {/* PASSWORD */}
                    <div className="auth-group">

                        <label>Password</label>

                        <div className="input-wrapper">

                            <Lock size={20} />

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>

                        </div>

                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </button>

                </form>

                {/* DIVIDER */}
                <div className="auth-divider">
                    <span></span>
                    <p>OR</p>
                    <span></span>
                </div>

                {/* REGISTER */}
                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create one
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;