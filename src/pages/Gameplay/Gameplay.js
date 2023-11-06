import './Gameplay.css';
import Clue from "../../models/Clue";
import GameBoard from "./GameBoard";
import GameClue from "./GameClue";

import { useDispatch, useSelector } from "react-redux";
import { revealClueWVC, revealResponse, returnToBoard } from "../../redux/gameplay/gameplaySlice";

const Gameplay = () => {
  const dispatch = useDispatch();
  const currentCustomSet = useSelector(state => state.customSets.currentCustomSet);
  const currentUser = useSelector(state => state.user);
  const currentGame = useSelector(state => state.gameplay);
  const currentClue = new Clue(useSelector(state => state.gameplay.clue));

  const handleSiderailButtonClick = () => {
    // The WVC wager prompt is showing; continue to clue
    if (currentClue.isWVC && !currentGame.clueMechanics.wvcWagerMade) {
      dispatch(revealClueWVC());
    } else {
      // The clue and/or response is showing
      !currentGame.clueMechanics.showResponse ? dispatch(revealResponse()) : dispatch(returnToBoard());
    }
  };

  return (
    <div className="gameplay">
      <div className="top-bar">
        <div className="lhs">
          <div className="titles">
            <h4>{currentCustomSet.title}</h4>
            <p>Hosted by {currentUser.name}</p>
          </div>
          <div className="join-info">
            <h4>894156</h4>
            <p>Join at <b>www.trivio.live</b></p>
          </div>
        </div>
        <div className="progress-bars">
          <div className="bar round-1">
            <div className="fill"/>
            <p>Round 1</p>
          </div>
          { currentCustomSet.hasTwoRounds && 
            <div 
              style={{opacity: currentGame.gamePhase === "round2" ? 1 : 0.4}} 
              className="bar round-2">
              <div className="fill"/>
              <p>Round 2</p>
            </div>
          }
          <div
            style={{opacity: currentGame.gamePhase === "finalClue" ? 1 : 0.4}}
            className="bar final-clue">
            <div className="fill"/>
            <p>Final Clue</p>
          </div>
        </div>
      </div>
      <div className="gameplay-content">
        {currentGame.gameplayDisplay === "board" && <GameBoard/>}
        {currentGame.gameplayDisplay === "clue" && <GameClue/>}
        <div className="live-siderail">
          {currentGame.gameplayDisplay === "clue" &&
            <button onClick={() => handleSiderailButtonClick()} className="clue-cta-button">
              {(currentClue.isWVC && !currentGame.clueMechanics.wvcWagerMade)
                ? <p>Show the Clue</p>
                : (currentGame.clueMechanics.showResponse ? <p>Back to the Board</p> : <p>Reveal Response</p>)
              }
            </button>
          }
        </div>  
      </div>
    </div>
  );
};

export default Gameplay;