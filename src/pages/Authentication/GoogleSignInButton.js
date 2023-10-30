import React from "react";
import { 
  getAuth, 
  signInWithPopup,
  GoogleAuthProvider, 
} from "firebase/auth";

import GoogleLogo from '../../images/Authentication/GoogleLogo.png';

function GoogleSignInButton() {
  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button onClick={signInWithGoogle} className="google-auth">
      <img src={GoogleLogo} alt="Google Logo"/>
      <p>Sign in with Google</p>
    </button>
  );
}

export default GoogleSignInButton;
