import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Lock,
    Mail,
    ArrowLeft,
    Eye,
    EyeOff,
} from "lucide-react";
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
                password,
            });

            const data = response.data;
            const user = data.user;

            // Debugging: inspect the returned user role.
            // Never log or share the access token.
            console.log("LOGIN USER:", user);

            if (!data.access_token || !user) {
                throw new Error(
                    "The server returned an incomplete login response."
                );
            }

            const role = String(user.role || "")
                .trim()
                .toLowerCase();

            if (role !== "admin" && role !== "citizen") {
                setError(
                    "Your account role could not be verified. Please contact the administrator."
                );
                return;
            }

            localStorage.setItem(
                "access_token",
                data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            if (role === "admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/dashboard", { replace: true });
            }
        } catch (err) {
            console.error(
                "LOGIN ERROR:",
                err.response?.data || err.message
            );

            setError(
                err.response?.data?.detail ||
                err.message ||
                "Login failed. Please check your email and password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-brand">
                <div className="brand-icon">🏙️</div>
                <span>CivicFix</span>
            </div>

            <Link to="/" className="back-home">
                <ArrowLeft size={18} />
                Back to CivicFix
            </Link>

            <div className="community-text">
                🛡️ Building a better community
            </div>

            <div className="auth-card">
                <div className="auth-logo">🏙️</div>

                <h1>Welcome back</h1>

                <p className="auth-subtitle">
                    Sign in to manage your civic reports.
                </p>

                {error && (
                    <div
                        className="error-message"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <div className="input-wrapper">
                            <Mail size={20} />

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                autoComplete="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">
                            <Lock size={20} />

                            <input
                                id="password"
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
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword((previous) => !previous)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
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

                <div className="auth-divider">
                    <span></span>
                    <p>OR</p>
                    <span></span>
                </div>

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
