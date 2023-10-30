import './LandingPage.css';
import { Link } from 'react-router-dom';

import LandingPageCover from '../../images/LandingPage/LandingPageCover.png';
import CluePreview from '../../images/LandingPage/CluePreview.png';
import MobileAppScreenshots from '../../images/LandingPage/MobileAppScreenshots.png';

import MagnifyingGlassIcon from '../../images/LandingPage/MagnifyingGlassIcon.png';
import CheckmarkIcon from '../../images/LandingPage/CheckmarkIcon.png';
import XmarkIcon from '../../images/LandingPage/XmarkIcon.png';
import ArrowRightIcon from '../../images/LandingPage/ArrowRightIcon.png';
import AppStoreBadge from '../../images/LandingPage/AppStoreBadge.png';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="navigation-bar-container">
        <div className="contents">
          <Link className="site-title" to="/">Trivio!</Link>
          <div className="lhs">
            <div className="search-bar">
              <img src={MagnifyingGlassIcon} alt="Magnifying Glass Icon" />
              <p>Search all sets</p>
            </div>
            <button>Join a game</button>
            <Link to="/sign-in">
              <button>Sign in</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="cover-container">
        <div className="hero-cta">
          <h2>The most authentic live Jeopardy experience on the web</h2>
          <Link to="/sign-in">
            <button>Sign up for free</button>
          </Link>
        </div>
        <img
          src={LandingPageCover} 
          alt="Desktop and mobile screenshots of Trivio! gameplay"  
        />
      </div>
      <div className="intro-section">
        <div className="lhs">
          <h3>Trivio! Web</h3>
          <h1>Classic feel, modern look</h1>
          <p>Channel your inner contestant with Trivio!, the newest 
          Jeopardy website that brings your favorite gameshow straight 
          to your home, business, or classroom. You can play sets 
          with buzzers, without buzzers, on your phone, or in a web 
          browser, all completely for free.</p>
          <Link to="/sign-in">
            <button>Get started</button>
          </Link>
        </div>
        <img src={CluePreview} alt="Preview of a Trivio! clue during gameplay"/>
      </div>
      <div className="pricing-section">
        <div className="container">
          </div>
          <div className="titles">
            <h3 style={{color: "#756CF4"}}>Pricing Options</h3>
            <h3>Hobbyist or professional, there's something for everyone.</h3>
          </div>
          <div className="pricing-panels">
            <div className="panel free">
              <div className="main-info">
                <h3>Free Tier</h3>
                <div className="price-ratio">
                  <h1>$0</h1>
                  <p>/ month</p>
                </div>
                <p className="billing-detail">Free forever</p>
                <button>Sign up for free</button>
              </div>
              <div className="features">
                <div className="feature">
                  <img src={CheckmarkIcon} alt="Checkmark Icon" />
                  <p>Supports up to 5 buzzers per game</p>
                </div>
                <div className="feature">
                  <img src={CheckmarkIcon} alt="Checkmark Icon" />
                  <p>Build and play Trivio! sets</p>
                </div>
                <div className="feature">
                  <img src={XmarkIcon} alt="Xmark Icon" />
                  <p>Built-in team play</p>
                </div>
                <div className="feature">
                  <img src={XmarkIcon} alt="Xmark Icon" />
                  <p>Add images, videos to sets</p>
                </div>
              </div>
            </div>
            <div className="panel trivio-plus">
              <div className="main-info">
                <h3>Trivio! Plus</h3>
                <div className="price-ratio">
                  <h1>$0.99</h1>
                  <p>/ month</p>
                </div>
                <div className="billing-details">
                  <p className="billing-detail">Billed yearly</p>  
                  <div className="billing-rate-toggle">
                    <p>Switch to monthly billing</p>
                    <img src={ArrowRightIcon} alt="Arrow Right Icon" />
                  </div>
                </div>
                <button>Subscribe</button>
              </div>
              <div className="features">
                <div className="feature">
                  <img src={CheckmarkIcon} alt="Checkmark Icon" />
                  <p>Unlimited buzzers per game</p>
                </div>
                <div className="feature">
                  <img src={CheckmarkIcon} alt="Checkmark Icon" />
                  <p>Build and play Trivio! sets</p>
                </div>
                <div className="feature">
                  <img src={CheckmarkIcon} alt="Xmark Icon" />
                  <p>Built-in team play</p>
                </div>
                <div className="feature">
                  <img src={CheckmarkIcon} alt="Xmark Icon" />
                  <p>Add images, videos to sets</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="app-info-section">
        <img
          className="screenshots"
          src={MobileAppScreenshots} 
          alt="Mobile App screenshots from left to 
          right: homepage, set preview, game board"
        />
        <div className="rhs">
          <h3>Trivio! iOS App</h3>
            <h1>May the board be with you, always.</h1>
            <p>Trivio's iOS app seamlessly translates all the 
            capabilities of our web platform into a mobile 
            experience. Designed for your convenience, it 
            ensures that your data remains synchronized across 
            all your devices, offering you constant access as 
            long as you're logged in.</p>
            <img src={AppStoreBadge} alt="iOS App Store Download Badge" />
        </div>
      </div>
      <div className="footer">
        <h4>© 2023 Trivio!</h4>
        <div className="rhs-links">
          <Link className="footer-links" to="/contact">Contact</Link>
          <Link className="footer-links" to="/about">About</Link>
          <Link className="footer-links" to="/terms">Terms</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;