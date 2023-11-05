import { useSelector } from "react-redux";
import './WaitingRoom.css';

import SelectorTriangles from "../../images/WaitingRoom/SelectorTriangles.png";
import TextFormat from "../../images/WaitingRoom/TextFormat.png";
import ArrowClockwise from "../../images/WaitingRoom/ArrowClockwise.png";
import Hourglass from "../../images/WaitingRoom/Hourglass.png";
import ArrowRight from "../../images/WaitingRoom/ArrowRight.png";

const WaitingRoom = () => {
  const currentCustomSet = useSelector(state => state.customSets.currentCustomSet);
  const currentUser = useSelector(state => state.user);

  return (
    <div className="waiting-room">
      <div className="left-panels">
        <div className="game-settings">
          <div className="titles">
            <h4>{currentCustomSet.title}</h4>
            <p>Hosted by {currentUser.name}</p>
          </div>
          <button className="game-mode-selector">
            <p>Solo Play</p>
            <img src={SelectorTriangles} alt="Selector icon"/>
          </button>
          <button className="upgrade-button">
            <p>Upgrade to Trivio! Plus</p>
          </button>
        </div>
        <div className="join-game-instructions">
          <div className="top-portion">
            <div className="game-code">
              <h1>894156</h1>
            </div>
            <div className="instructions-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="373" height="205" viewBox="0 0 373 205" fill="none">
                <path d="M0 20C0 8.95429 8.95431 0 20 0H353C364.046 0 373 8.9543 373 20V115.697C373 123.69 368.24 
                130.916 360.896 134.072L201.109 202.731C196.237 204.824 190.733 204.897 185.807 202.934L12.5946 
                133.891C4.98961 130.86 0 123.5 0 115.313V20Z" fill="#2B2674"/>
                <path d="M0.5 20C0.5 9.23043 9.23045 0.5 20 0.5H353C363.77 0.5 372.5 9.23045 372.5 20V115.697C372.5 
                123.49 367.859 130.536 360.698 133.613L200.911 202.271C196.161 204.312 190.795 204.384 185.993 
                202.469L12.7798 133.427C5.36487 130.471 0.5 123.295 0.5 115.313V20Z" stroke="white" stroke-opacity="0.3"/>
              </svg>
              <div className="instruction-text">
                <p>Enter code at <b>www.trivio.live</b> in a mobile 
                browser to join this live game.</p>
              </div>
            </div>
          </div>
          <div className="mock-browser-search-bar">
            <div className="stub left"/>
            <div className="center-content">
              <img className="text-icon" src={TextFormat} alt="Text format icon"/>
              <p>trivio.live</p>
              <img className="arrow-icon" src={ArrowClockwise} alt="Clockwise arrow icon"/>
            </div>
            <div className="stub right"/>
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="header">
          <h1>Contestants</h1>
          <div className="buzzer-limit-info">
            <p>Limited to 5</p>
            <div className="dot-icon"/>
            <button>
              <p>Upgrade to increase limit</p>
            </button>
          </div>
        </div>
        <div className="no-contestants-content">
          <img src={Hourglass} alt="Hourglass"/>
          <h3>Waiting for contestants to join...</h3>
        </div>
        <button style={{opacity: '10%'}} className="continue-button">
          <h2>Continue</h2>
          <img src={ArrowRight} alt="Arrow pointing right"/>
        </button>
      </div>
    </div>
  );
};

export default WaitingRoom;