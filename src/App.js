import './App.css';
import { React, useEffect } from 'react';
import { getAuth, getRedirectResult } from "firebase/auth";
import { firestore } from "./services/firebase";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "./redux/user/userSlice";

import LandingPage from './pages/LandingPage/LandingPage';
import Authentication from "./pages/Authentication/Authentication";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged(user => {
      console.log('user:', user);
      if (user) {
        const userRef = firestore.doc(`users/${user.uid}`);
        const snap = userRef.get();

        if (!snap.exists) {
          console.log("User document snapshot doesn't exist");
          window.location.href = "/create-account";
        } else {
          const userData = {
            authenticated: true,
            username: snap.data().username,
            name: snap.data().name,
            UUID: snap.data().UUID,
          };
          console.log("User document snapshot:", userData);
          dispatch(signIn(userData));
        }
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={ <LandingPage/> } />
        <Route exact path="/sign-in" element={ <Authentication/> } />
      </Routes>
    </Router>
  );
}

export default App;
