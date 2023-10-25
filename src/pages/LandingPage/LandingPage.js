import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="header">
      <Link to="/">Trivio!</Link>
    </div>
  );
}

export default LandingPage;