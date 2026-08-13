import { Link } from "react-router-dom";
import {
  MapPin,
  ShieldCheck,
  Bell,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="logo-mark">
            <MapPin size={22} />
          </div>
          <span>CityFix</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/report">Report Issue</Link>
          <Link to="/issues">View Issues</Link>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="nav-register">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <div className="badge">
            <ShieldCheck size={18} />
            Smart Civic Reporting Platform
          </div>

          <h1>
            Report Issues.
            <br />
            <span>Improve Your City.</span>
          </h1>

          <p>
            Help make your community safer and better by reporting
            potholes, garbage, damaged roads, streetlights and other
            civic issues.
          </p>

          <div className="hero-buttons">

            <Link to="/report" className="primary-button">
              Report an Issue
              <ArrowRight size={20} />
            </Link>

            <Link to="/issues" className="secondary-button">
              View Issues
            </Link>

          </div>

          <div className="trust-row">
            <div>
              <CheckCircle size={17} />
              Easy reporting
            </div>

            <div>
              <CheckCircle size={17} />
              Track progress
            </div>

            <div>
              <CheckCircle size={17} />
              Help your community
            </div>
          </div>

        </div>

        {/* HERO CARD */}
        <div className="hero-visual">

          <div className="floating-card card-one">
            <span>📍</span>
            <div>
              <strong>Issue Reported</strong>
              <small>Pothole · Main Road</small>
            </div>
          </div>

          <div className="hero-card">

            <div className="hero-icon">
              <MapPin size={52} />
            </div>

            <div className="mini-badge">
              ● LIVE COMMUNITY
            </div>

            <h3>Make Your Voice Count</h3>

            <p>
              Report local problems and help authorities take
              action faster.
            </p>

            <div className="status-list">

              <div className="status-row">
                <CheckCircle size={18} />
                Easy Reporting
              </div>

              <div className="status-row">
                <CheckCircle size={18} />
                Real-time Status
              </div>

              <div className="status-row">
                <CheckCircle size={18} />
                Community Driven
              </div>

            </div>

          </div>

          <div className="floating-card card-two">
            <span>✓</span>
            <div>
              <strong>Issue Resolved</strong>
              <small>Streetlight repaired</small>
            </div>
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="stats">

        <div className="stat">
          <strong>500+</strong>
          <span>Issues Reported</span>
        </div>

        <div className="stat">
          <strong>250+</strong>
          <span>Issues Resolved</span>
        </div>

        <div className="stat">
          <strong>1,200+</strong>
          <span>Active Citizens</span>
        </div>

        <div className="stat">
          <strong>95%</strong>
          <span>Community Satisfaction</span>
        </div>

      </section>

      {/* FEATURES */}
      <section className="features-section">

        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>Turn problems into progress.</h2>
          <p>
            A simple way for citizens to report problems and
            help create a better city.
          </p>
        </div>

        <div className="features">

          <div className="feature-card">
            <div className="feature-number">01</div>

            <div className="feature-icon">
              <MapPin />
            </div>

            <h3>Report Problems</h3>

            <p>
              Submit civic issues with location, description
              and category.
            </p>

            <Link to="/report">
              Report now <ArrowRight size={16} />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-number">02</div>

            <div className="feature-icon">
              <Bell />
            </div>

            <h3>Track Updates</h3>

            <p>
              Follow the progress of your reported issues
              from submission to resolution.
            </p>

            <Link to="/issues">
              View issues <ArrowRight size={16} />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-number">03</div>

            <div className="feature-icon">
              <ShieldCheck />
            </div>

            <h3>Build Better Communities</h3>

            <p>
              Work together with citizens and authorities to
              create cleaner and safer neighborhoods.
            </p>

            <Link to="/register">
              Join CityFix <ArrowRight size={16} />
            </Link>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta-section">

        <div>
          <span>YOUR CITY. YOUR VOICE.</span>
          <h2>See something that needs fixing?</h2>
          <p>
            Report it today and help make your community better.
          </p>
        </div>

        <Link to="/report" className="cta-button">
          Report an Issue
          <ArrowRight size={19} />
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <div className="logo-mark">
            <MapPin size={19} />
          </div>
          CityFix
        </div>

        <p>
          Smart civic reporting for better communities.
        </p>

        <span>© 2026 CityFix</span>
      </footer>

    </div>
  );
}

export default Home;