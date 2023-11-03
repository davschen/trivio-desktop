import { Link } from 'react-router-dom';
import './NavigationBar.css';
import MagnifyingGlassIcon from '../../images/LandingPage/MagnifyingGlassIcon.png';

const NavigationBar = () => {
  return (
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
  );
}

export default NavigationBar;