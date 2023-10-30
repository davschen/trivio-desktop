import './Authentication.css';

import GoogleSignInButton from "./GoogleSignInButton";

import AppleLogo from '../../images/Authentication/AppleLogo.png';

const Authentication = () => {
  return (
    <div className="authentication">
      <div className="container">
        <div className="logo">Trivio!</div>
        <div className="subheading">Make & Play Trivia</div>
        <GoogleSignInButton/>
        <div className="apple-auth">
          <img src={AppleLogo} alt="Apple Logo"/>
          <p>Sign in with Apple</p>
        </div>
        <p className="disclaimer">By signing up, you 
        agree to the Terms of Service and Privacy Policy, 
        including Cookie Use.</p>
      </div>
    </div>
  );
}

export default Authentication;