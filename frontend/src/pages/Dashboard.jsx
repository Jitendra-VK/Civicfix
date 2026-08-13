import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="dashboard-page">

            <header className="dashboard-header">

                <div>
                    <h1>
                        Welcome{user?.name ? `, ${user.name}` : ""} 👋
                    </h1>

                    <p>
                        Report issues and help make your city better.
                    </p>
                </div>

                <nav className="dashboard-nav">

                    <Link to="/" className="nav-link">
                        Home
                    </Link>

                    <Link to="/report" className="nav-link">
                        Report Issue
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>

                </nav>

            </header>


            <main className="dashboard-content">

                <section className="dashboard-card">

                    <div className="card-icon">
                        📝
                    </div>

                    <h2>Report an Issue</h2>

                    <p>
                        Report potholes, garbage problems, damaged roads,
                        streetlights and other civic issues.
                    </p>

                    <Link
                        to="/report"
                        className="dashboard-btn"
                    >
                        Report Issue
                    </Link>

                </section>


                <section className="dashboard-card">

                    <div className="card-icon">
                        📋
                    </div>

                    <h2>My Reports</h2>

                    <p>
                        View the issues you have reported and track their
                        current status.
                    </p>

                    <Link
                        to="/issues"
                        className="dashboard-btn secondary"
                    >
                        View My Reports
                    </Link>

                </section>


                <section className="dashboard-card">

                    <div className="card-icon">
                        📊
                    </div>

                    <h2>Issue Status</h2>

                    <p>
                        Keep track of reported, in-progress and resolved
                        civic issues.
                    </p>

                    <Link
                        to="/issues"
                        className="dashboard-btn secondary"
                    >
                        Track Issues
                    </Link>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;