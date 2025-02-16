import React from 'react';
import './WelcomePage.css'; 
import { Link } from 'react-router-dom';


const WelcomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
        {/* <img src={logo3} alt="Noteworthy Logo" className="hero-logo"/>  */}
          <h1 className="hero-title">Welcome to Noteworthy!</h1>
          <p className="hero-subtitle">Where We Help You Visualize, Capture, Remember</p>
          <Link to="/student-view">
            <button className="cta-button">Get Started</button>
          </Link>

        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <h3 className="feature-title">Visualize</h3>
          <p>Transform your ideas into clear visual representations with ease.</p>
        </div>
        <div className="feature">
          <h3 className="feature-title">Capture</h3>
          <p>Keep all your thoughts and ideas in one place, easily accessible.</p>
        </div>
        <div className="feature">
          <h3 className="feature-title">Remember</h3>
          <p>Stay on top of everything you need to retain and revisit later.</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Noteworthy. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
