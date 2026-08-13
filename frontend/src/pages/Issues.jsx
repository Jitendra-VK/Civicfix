import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, FileText } from "lucide-react";
import api from "../services/api";
import "./Issues.css";

function Issues() {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyIssues();
    }, []);

    const fetchMyIssues = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/issues/my");

            console.log("MY ISSUES:", response.data);

            setIssues(response.data);

        } catch (err) {
            console.error("ERROR FETCHING ISSUES:", err);

            setError(
                err.response?.data?.detail ||
                "Unable to load your reports."
            );
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "reported":
                return "status-reported";

            case "in_progress":
            case "in-progress":
                return "status-progress";

            case "resolved":
                return "status-resolved";

            default:
                return "status-default";
        }
    };

    const formatStatus = (status) => {
        if (!status) return "UNKNOWN";

        return status
            .replace("_", " ")
            .toUpperCase();
    };

    return (
        <div className="issues-page">

            <header className="issues-header">

                <div>
                    <Link
                        to="/dashboard"
                        className="back-link"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </Link>

                    <h1>My Reports</h1>

                    <p>
                        Track the civic issues you have reported.
                    </p>
                </div>

                <Link
                    to="/report"
                    className="new-report-btn"
                >
                    + Report New Issue
                </Link>

            </header>


            <main className="issues-container">

                {loading && (
                    <div className="state-card">
                        <div className="loading-spinner"></div>

                        <h2>Loading your reports...</h2>

                        <p>
                            Getting your reports from CivicFix.
                        </p>
                    </div>
                )}


                {!loading && error && (
                    <div className="state-card error-card">

                        <div className="state-icon">
                            ⚠️
                        </div>

                        <h2>Unable to load reports</h2>

                        <p>{error}</p>

                        <button
                            onClick={fetchMyIssues}
                            className="retry-btn"
                        >
                            Try Again
                        </button>

                    </div>
                )}


                {!loading &&
                    !error &&
                    issues.length === 0 && (
                        <div className="state-card">

                            <div className="state-icon">
                                📋
                            </div>

                            <h2>No reports yet</h2>

                            <p>
                                You haven't reported any civic
                                issues yet.
                            </p>

                            <Link
                                to="/report"
                                className="new-report-btn"
                            >
                                Report Your First Issue
                            </Link>

                        </div>
                    )}


                {!loading &&
                    !error &&
                    issues.length > 0 && (

                        <div className="reports-list">

                            <div className="reports-summary">
                                <div>
                                    <strong>
                                        {issues.length}
                                    </strong>

                                    <span>
                                        Total Reports
                                    </span>
                                </div>

                                <Link
                                    to="/report"
                                    className="summary-btn"
                                >
                                    + New Report
                                </Link>
                            </div>


                            {issues.map((issue) => (

                                <div
                                    className="issue-card"
                                    key={issue.id}
                                >

                                    <div className="issue-card-top">

                                        <div className="issue-icon">
                                            <FileText size={24} />
                                        </div>

                                        <div className="issue-main">

                                            <h2>
                                                {issue.title}
                                            </h2>

                                            <p className="issue-description">
                                                {issue.description}
                                            </p>

                                        </div>

                                        <span
                                            className={`status-badge ${getStatusClass(
                                                issue.status
                                            )}`}
                                        >
                                            {formatStatus(
                                                issue.status
                                            )}
                                        </span>

                                    </div>


                                    <div className="issue-details">

                                        <div>
                                            <MapPin size={17} />

                                            <span>
                                                {issue.location}
                                            </span>
                                        </div>

                                        <div>
                                            <Calendar size={17} />

                                            <span>
                                                {issue.created_at
                                                    ? new Date(
                                                        issue.created_at
                                                    ).toLocaleDateString()
                                                    : "Date unavailable"}
                                            </span>
                                        </div>

                                        <div>
                                            <strong>
                                                Report ID:
                                            </strong>

                                            <span>
                                                #{issue.id}
                                            </span>
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>
                    )}

            </main>

        </div>
    );
}

export default Issues;