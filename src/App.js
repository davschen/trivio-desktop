import './App.css';
import { React, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { firestore } from "./services/firebase";
import { useDispatch } from "react-redux";
import { signIn } from "./redux/user/userSlice";

import LandingPage from './pages/LandingPage/LandingPage';
import Authentication from "./pages/Authentication/Authentication";
import Homepage from "./pages/Homepage/Homepage";
import WaitingRoom from "./pages/WaitingRoom/WaitingRoom";
import Gameplay from "./pages/Gameplay/Gameplay";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
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

function AuthHandler() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(async user => {
      if (user && location.pathname === "/") {
        const userRef = firestore.doc(`users/${user.uid}`);
        const snap = await userRef.get();
        
        if (!snap.exists) {
          console.log("User document snapshot doesn't exist");
          navigate('/create-account');
        } else {
          const userData = {
            authenticated: true,
            username: snap.data().username,
            name: snap.data().name,
            UUID: snap.id,
          };
          dispatch(signIn(userData));
          navigate('/browse');
        }
      }
    });
  }, [dispatch, location.pathname, navigate]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthHandler />
      <Routes>
        <Route exact path="/" element={ <LandingPage/> } />
        <Route exact path="/browse" element={ <Homepage/> } />
        <Route exact path="/sign-in" element={ <Authentication/> } />
        <Route exact path="/waiting-room" element={ <WaitingRoom/> } />
        <Route exact path="/gameplay" element={ <Gameplay/> } />
      </Routes>
    </Router>
  );
}

export default App;
