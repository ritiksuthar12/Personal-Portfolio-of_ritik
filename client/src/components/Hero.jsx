import React from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './TechIcons';

export default function Hero({ onExploreProjects }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-wrapper">
      {/* Left Column: Info & Actions */}
      <div className="hero-content-col">
        <p className="hero-greeting">HI, I'M</p>
        <h1 className="hero-name">Ritik Suthar</h1>
        <div className="hero-subtitle">
          <span>Full Stack Developer</span>
          <span className="subtitle-divider">|</span>
          <span>MERN Stack</span>
          <span className="subtitle-divider">|</span>
          <span>C++</span>
          <span className="subtitle-divider">|</span>
          <span>DSA</span>
        </div>
        <p className="hero-desc">
          I build modern and responsive web applications with clean UI and meaningful functionality.
          I love turning ideas into real world products.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <button
            onClick={onExploreProjects || (() => scrollTo('projects'))}
            className="btn-primary hero-btn"
          >
            <span>View My Work</span> <ArrowRight size={17} />
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('contact');
            }}
            className="btn-outline hero-btn"
          >
            <span>Download Resume</span> <Download size={16} />
          </a>
        </div>

        {/* Social Links */}
        <div className="hero-socials">
          <a
            href="https://github.com/ritiksuthar"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://linkedin.com/in/ritiksuthar"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="https://instagram.com/ritiksuthar"
            target="_blank"
            rel="noreferrer"
            className="social-btn"
            title="Instagram"
            aria-label="Instagram"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href="mailto:ritiksuthar.dev@gmail.com"
            className="social-btn"
            title="Email Ritik"
            aria-label="Email Ritik"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Right Column: Portrait with Orbital Loops & Handwritten Note */}
      <div className="hero-portrait-col">
        <div className="hero-portrait-container">
          {/* Artistic Loop/Orbit SVG doodle matching screenshot */}
          <svg
            className="doodle-loop-svg"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Main elliptical orbital sketch line */}
            <path
              d="M 50 300 C 50 160, 220 70, 410 110 C 470 125, 480 230, 410 270 C 310 320, 110 360, 80 290 C 60 240, 140 170, 260 140 C 370 115, 440 170, 420 250"
              stroke="#111827"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
            {/* Subtle accent burst lines top left */}
            <path
              d="M 120 120 L 140 145"
              stroke="#111827"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M 105 135 L 118 152"
              stroke="#111827"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>

          {/* Developer Portrait Image */}
          <div className="portrait-photo-box">
            <img
              src="/ritik.jpg"
              alt="Ritik Suthar - Full Stack Developer"
              className="portrait-img"
              loading="eager"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
              }}
            />
          </div>

          {/* Handwritten text quote matching screenshot: Build Learn Improve Repeat */}
          <div className="handwritten-motto">
            <div>Build</div>
            <div>Learn</div>
            <div>Improve</div>
            <div>Repeat</div>
          </div>
        </div>
      </div>
    </section>
  );
}
