import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import Issues from "./pages/Issues";
import Admin from "./pages/Admin";

import "./App.css";

// ===============================
// PROTECTED USER ROUTE
// ===============================

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// ===============================
// PROTECTED ADMIN ROUTE
// ===============================

function AdminRoute({ children }) {
    const token = localStorage.getItem("access_token");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

// ===============================
// APP
// ===============================

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    CITIZEN DASHBOARD
                ========================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    REPORT ISSUE
                ========================= */}

                <Route
                    path="/report"
                    element={
                        <ProtectedRoute>
                            <ReportIssue />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    MY REPORTS / ISSUE STATUS
                ========================= */}

                <Route
                    path="/issues"
                    element={
                        <ProtectedRoute>
                            <Issues />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    ADMIN DASHBOARD
                ========================= */}

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }
                />


                {/* =========================
                    UNKNOWN URL
                ========================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;