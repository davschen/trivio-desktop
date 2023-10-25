import './App.css';
import { React, useEffect } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={ <LandingPage/> } />
      </Routes>
    </Router>
  );
}

export default App;
