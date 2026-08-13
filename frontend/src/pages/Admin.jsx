import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FileText,
    Clock,
    CheckCircle,
    Users,
    LogOut,
    MapPin,
    RefreshCw
} from "lucide-react";

import api from "../services/api";
import "./Admin.css";


function Admin() {
    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);


    // ==========================================
    // FETCH REPORTS
    // ==========================================

    const fetchIssues = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/issues");

            console.log("ADMIN ISSUES:", response.data);

            setIssues(response.data);

        } catch (err) {
            console.error("ADMIN ISSUE ERROR:", err);

            setError(
                err.response?.data?.detail ||
                "Unable to load reports."
            );

        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchIssues();
    }, []);


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        navigate("/login");
    };


    // ==========================================
    // UPDATE ISSUE STATUS
    // ==========================================

    const handleStatusChange = async (issueId, newStatus) => {
        try {
            setUpdatingId(issueId);

            const response = await api.put(
                `/issues/${issueId}/status`,
                {
                    status: newStatus
                }
            );

            console.log(
                "STATUS UPDATED:",
                response.data
            );

            // Update only the changed issue
            setIssues((currentIssues) =>
                currentIssues.map((issue) =>
                    issue.id === issueId
                        ? response.data
                        : issue
                )
            );

        } catch (err) {
            console.error(
                "STATUS UPDATE ERROR:",
                err
            );

            alert(
                err.response?.data?.detail ||
                "Unable to update issue status."
            );

        } finally {
            setUpdatingId(null);
        }
    };


    // ==========================================
    // STATISTICS
    // ==========================================

    const totalReports = issues.length;

    const pendingIssues = issues.filter(
        (issue) =>
            issue.status === "reported" ||
            issue.status === "in_progress"
    ).length;

    const resolvedIssues = issues.filter(
        (issue) =>
            issue.status === "resolved"
    ).length;
    const updateIssueStatus = async (issueId, newStatus) => {
        try {
            await api.put(
                `/admin/issues/${issueId}/status`,
                {
                    status: newStatus
                }
            );

            // Refresh the reports after updating
            fetchIssues();

        } catch (err) {
            console.error("STATUS UPDATE ERROR:", err);

            alert(
                err.response?.data?.detail ||
                "Unable to update issue status."
            );
        }
    };

    return (
        <div className="admin-page">

            {/* ==================================
                HEADER
            ================================== */}

            <header className="admin-header">

                <div className="admin-heading">

                    <h1>
                        🛡️ Admin Dashboard
                    </h1>

                    <p>
                        Manage and monitor CivicFix reports.
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    <LogOut size={17} />
                    Logout
                </button>

            </header>


            {/* ==================================
                STATISTICS
            ================================== */}

            <section className="admin-stats">

                <div className="admin-stat-card">

                    <div className="stat-icon blue">
                        <FileText size={25} />
                    </div>

                    <div>
                        <strong>
                            {totalReports}
                        </strong>

                        <span>
                            Total Reports
                        </span>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="stat-icon orange">
                        <Clock size={25} />
                    </div>

                    <div>
                        <strong>
                            {pendingIssues}
                        </strong>

                        <span>
                            Pending Issues
                        </span>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="stat-icon green">
                        <CheckCircle size={25} />
                    </div>

                    <div>
                        <strong>
                            {resolvedIssues}
                        </strong>

                        <span>
                            Resolved Issues
                        </span>
                    </div>

                </div>


                <div className="admin-stat-card">

                    <div className="stat-icon purple">
                        <Users size={25} />
                    </div>

                    <div>
                        <strong>
                            —
                        </strong>

                        <span>
                            Citizens
                        </span>
                    </div>

                </div>

            </section>


            {/* ==================================
                REPORTS
            ================================== */}

            <section className="admin-reports">

                <div className="section-heading">

                    <div>
                        <h2>
                            Recent Civic Reports
                        </h2>

                        <p>
                            Reports submitted by citizens.
                        </p>
                    </div>

                    <button
                        onClick={fetchIssues}
                        className="refresh-btn"
                    >
                        <RefreshCw size={15} />
                        Refresh
                    </button>

                </div>


                {/* LOADING */}

                {loading && (
                    <div className="admin-state">

                        <div className="loading-spinner"></div>

                        <h3>
                            Loading reports...
                        </h3>

                        <p>
                            Fetching data from PostgreSQL.
                        </p>

                    </div>
                )}


                {/* ERROR */}

                {!loading && error && (
                    <div className="admin-state error-state">

                        <div className="state-icon">
                            ⚠️
                        </div>

                        <h3>
                            Unable to load reports
                        </h3>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={fetchIssues}
                            className="retry-btn"
                        >
                            Try Again
                        </button>

                    </div>
                )}


                {/* NO REPORTS */}

                {!loading &&
                    !error &&
                    issues.length === 0 && (

                        <div className="admin-state">

                            <div className="state-icon">
                                📋
                            </div>

                            <h3>
                                No reports yet
                            </h3>

                            <p>
                                Citizen reports will appear here.
                            </p>

                        </div>
                    )}


                {/* REPORT LIST */}

                {!loading &&
                    !error &&
                    issues.length > 0 && (

                        <div className="admin-report-list">

                            {issues.map((issue) => (

                                <div
                                    className="admin-report-card"
                                    key={issue.id}
                                >

                                    {/* REPORT MAIN */}

                                    <div className="admin-report-main">

                                        <div className="admin-report-icon">
                                            <FileText size={23} />
                                        </div>

                                        <div>

                                            <h3>
                                                {issue.title}
                                            </h3>

                                            <p>
                                                {issue.description}
                                            </p>

                                        </div>

                                    </div>


                                    {/* REPORT INFORMATION */}

                                    <div className="admin-report-info">

                                        <span>
                                            <MapPin size={15} />

                                            {issue.location}
                                        </span>

                                        <span>
                                            Report ID: #{issue.id}
                                        </span>

                                    </div>


                                    {/* STATUS CONTROL */}

                                    <div className="admin-status-control">

                                        <label>
                                            Issue Status
                                        </label>

                                        <select
                                            value={issue.status}
                                            disabled={
                                                updatingId === issue.id
                                            }
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    issue.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="reported">
                                                🟠 Reported
                                            </option>

                                            <option value="in_progress">
                                                🔵 In Progress
                                            </option>

                                            <option value="resolved">
                                                🟢 Resolved
                                            </option>

                                        </select>

                                        {updatingId === issue.id && (
                                            <span className="updating-text">
                                                Updating...
                                            </span>
                                        )}

                                    </div>


                                    {/* CURRENT STATUS */}

                                   <div className="admin-report-status">

                                        <span
                                            className={`status-badge status-${issue.status}`}        >
                                                {issue.status
                                                    ?.replace("_", " ")
                                                    .toUpperCase()}
                                        </span>

                                            <select
                                                value={issue.status}
                                                onChange={(e) =>
                                                    updateIssueStatus(
                                                        issue.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="status-select"
                                           >
                                                <option value="reported">
                                                    Reported
                                                </option>
                                                <option value="in_progress">
                                                    In Progress
                                                </option>
                                                <option value="resolved">
                                                    Resolved
                                                </option>
                                            </select>
                                        </div>

                                </div>

                            ))}

                        </div>
                    )}

            </section>

        </div>
    );
}


export default Admin;