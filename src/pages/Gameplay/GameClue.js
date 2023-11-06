import { useSelector } from "react-redux";
import Clue from "../../models/Clue";

import XmarkButton from "../../images/Gameplay/XmarkButton.png";
import SpeakerButton from "../../images/Gameplay/SpeakerButton.png";

const GameClue = () => {
  const currentGame = useSelector(state => state.gameplay);
  const currentClue = new Clue(useSelector(state => state.gameplay.clue));

  return (
    <div className="game-clue">
      <div className="countdown-timer">
        {([...Array(currentGame.clueMechanics.numCountdownSeconds * 2 - 1).keys()]).map((_, index) => (
          <div className="countdown-block" key={index}/>
        ))}
      </div>
      <div className="clue-card">
        <div className="header">
          <img src={XmarkButton} alt="Xmark button"/>
          <div className="titles">
            <p>
              {currentClue.categoryString}<br/>
              {!(currentClue.isWVC && !currentGame.clueMechanics.wvcWagerMade) &&
                `for ${currentClue.pointValueInt}`
              }
            </p>
          </div>
          <img src={SpeakerButton} alt="Speaker button"/>
        </div>
        {(currentClue.isWVC && !currentGame.clueMechanics.wvcWagerMade)
          ?
          <div className="wvc-prompt">
            <h1>Wager Value Clue</h1>
            <p>Make your wager!</p>
          </div>
          :
          <div className="clue-response-field">
            <p className="clue-string">{currentClue.clueString}</p>
            {currentGame.clueMechanics.showResponse &&
              <p className="response-string">{currentClue.responseString}</p>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default GameClue;