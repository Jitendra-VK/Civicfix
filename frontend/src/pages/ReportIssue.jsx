
import { useState, useEffect } from "react";
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

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [reportId, setReportId] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!image) {
            setPreviewUrl("");
            return;
        }

        const url = URL.createObjectURL(image);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [image]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        setError("");

        if (!file) {
            setImage(null);
            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Choose a JPG, PNG, or WEBP image.");
            e.target.value = "";
            setImage(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be smaller than 5 MB.");
            e.target.value = "";
            setImage(null);
            return;
        }

        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setError("");
        setLoading(true);

        try {
            const data = new FormData();

            data.append("category_id", formData.category_id);
            data.append("title", formData.title.trim());
            data.append("description", formData.description.trim());
            data.append("location", formData.location.trim());

            if (image) {
                data.append("image", image);
            }

            const response = await api.post("/issues", data);

            console.log("ISSUE CREATED:", response.data);

            setReportId(response.data.id);
            setSubmitted(true);
        } catch (err) {
            console.error("ISSUE SUBMISSION ERROR:", err);
            console.error("BACKEND RESPONSE:", err.response?.data);

            const detail = err.response?.data?.detail;

            if (Array.isArray(detail)) {
                setError(
                    detail
                        .map((item) =>
                            typeof item === "string"
                                ? item
                                : item.msg || "Invalid input"
                        )
                        .join(". ")
                );
            } else if (typeof detail === "string") {
                setError(detail);
            } else {
                setError(
                    "Unable to submit the report. Please check your details and try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="report-page">
                <div className="success-card">
                    <div className="success-icon">✓</div>

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
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="back-button"
                    >
                        ← Back to Dashboard
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setFormData({
                                category_id: "1",
                                title: "",
                                description: "",
                                location: "",
                            });
                            setImage(null);
                            setReportId(null);
                            setSubmitted(false);
                            setError("");
                        }}
                        className="back-button"
                    >
                        + Report Another Issue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="report-page">
            <div className="report-header">
                <button
                    type="button"
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
                    <div className="info-icon">🏙️</div>

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
                            <p>Tell us where the issue is located.</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span>📝</span>
                        <div>
                            <strong>Clear Description</strong>
                            <p>Explain what is wrong.</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <span>⚡</span>
                        <div>
                            <strong>Quick Response</strong>
                            <p>Authorities can review your report.</p>
                        </div>
                    </div>
                </div>

                <div className="report-form-card">
                    {error && (
                        <div className="error-message" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="category_id">
                                Issue Category
                            </label>

                            <select
                                id="category_id"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="1">🕳️ Pothole</option>
                                <option value="2">💡 Street Light</option>
                                <option value="3">🛣️ Road Damage</option>
                                <option value="4">🚦 Traffic Signal</option>
                                <option value="5">🗑️ Public Cleanliness</option>
                                <option value="6">🏗️ Other Infrastructure</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Issue Title</label>

                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Example: Large pothole near bus stop"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the problem in detail..."
                                rows={5}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location</label>

                            <input
                                id="location"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Example: Main Road, Central Street"
                                required
                            />
                        </div>

                        <div className="upload-box">
                            <div className="upload-icon">📷</div>

                            <strong>Add a photo</strong>

                            <p>
                                Choose a JPG, PNG, or WEBP image.
                                Maximum size: 5 MB.
                            </p>

                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleImageChange}
                            />

                            {previewUrl && (
                                <div className="image-preview">
                                    <p>Selected: {image.name}</p>

                                    <img
                                        src={previewUrl}
                                        alt="Preview of selected issue"
                                        style={{
                                            display: "block",
                                            maxWidth: "100%",
                                            maxHeight: "200px",
                                            marginTop: "10px",
                                            borderRadius: "8px",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setImage(null)}
                                    >
                                        Remove photo
                                    </button>
                                </div>
                            )}
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
