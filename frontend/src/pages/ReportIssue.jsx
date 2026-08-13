import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ReportIssue.css";

function ReportIssue() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        category_id: "1",
        title: "",
        description: "",
        location: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [reportId, setReportId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/issues", {
                category_id: Number(formData.category_id),
                title: formData.title.trim(),
                description: formData.description.trim(),
                location: formData.location.trim(),
            });

            console.log("ISSUE CREATED:", response.data);

            setReportId(response.data.id);
            setSubmitted(true);

        } catch (err) {
            console.error("ISSUE SUBMISSION ERROR:", err);

            if (err.response) {
                console.error("STATUS:", err.response.status);
                console.error("DATA:", err.response.data);
            }

            setError(
                err.response?.data?.detail ||
                "Unable to submit the issue. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="report-page">
                <div className="success-card">

                    <div className="success-icon">
                        ✓
                    </div>

                    <h1>Issue Reported!</h1>

                    <p>
                        Thank you for helping improve your community.
                        Your report has been successfully submitted.
                    </p>

                    {reportId && (
                        <div className="report-id">
                            <span>Report ID</span>
                            <strong>#{reportId}</strong>
                        </div>
                    )}

                    <div className="report-id">
                        <span>Report Status</span>
                        <strong>REPORTED</strong>
                    </div>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="back-button"
                    >
                        ← Back to Dashboard
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="report-page">

            <div className="report-header">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="back-link"
                >
                    ← Back to CivicFix
                </button>

                <div className="report-title">
                    <span>REPORT AN ISSUE</span>

                    <h1>Help improve your city.</h1>

                    <p>
                        Tell us about a public infrastructure problem
                        and we'll make sure it gets attention.
                    </p>
                </div>

            </div>

            <div className="report-container">

                <div className="report-info">

                    <div className="info-icon">
                        🏙️
                    </div>

                    <h2>Every report matters.</h2>

                    <p>
                        Your report helps local authorities identify
                        problems, prioritize repairs and make public
                        spaces safer for everyone.
                    </p>

                    <div className="info-item">
                        <span>📍</span>

                        <div>
                            <strong>Precise Location</strong>
                            <p>
                                Tell us where the issue is located.
                            </p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span>📝</span>

                        <div>
                            <strong>Clear Description</strong>
                            <p>
                                Explain what is wrong.
                            </p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span>⚡</span>

                        <div>
                            <strong>Quick Response</strong>
                            <p>
                                Authorities can review your report.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="report-form-card">

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Issue Category</label>

                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="1">
                                    🕳️ Pothole
                                </option>

                                <option value="2">
                                    💡 Street Light
                                </option>

                                <option value="3">
                                    🛣️ Road Damage
                                </option>

                                <option value="4">
                                    🚦 Traffic Signal
                                </option>

                                <option value="5">
                                    🗑️ Public Cleanliness
                                </option>

                                <option value="6">
                                    🏗️ Other Infrastructure
                                </option>
                            </select>

                        </div>

                        <div className="form-group">

                            <label>Issue Title</label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Example: Large pothole near bus stop"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Description</label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the problem in detail..."
                                rows="5"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Example: Main Road, Central Street"
                                required
                            />

                        </div>

                        <div className="upload-box">

                            <div className="upload-icon">
                                📷
                            </div>

                            <strong>Add a photo</strong>

                            <p>
                                Photo upload will be connected
                                to the backend next.
                            </p>

                        </div>

                        <button
                            type="submit"
                            className="submit-report"
                            disabled={loading}
                        >
                            {loading
                                ? "Submitting..."
                                : "Submit Issue →"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ReportIssue;