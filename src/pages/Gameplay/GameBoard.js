import { useDispatch, useSelector } from "react-redux";
import { assignClue, modifyFinishedClues } from "../../redux/gameplay/gameplaySlice";

const GameBoard = () => {
  const dispatch = useDispatch();
  const currentCustomSet = useSelector(state => state.customSets.currentCustomSet);
  const currentGame = useSelector(state => state.gameplay);

  const handleSelectClue = (catIndex, clueIndex) => {
    const assignCluePayload = {
      catIndex: catIndex,
      clueIndex: clueIndex,
      currentCustomSet: { ...currentCustomSet }
    }
    const modifyFinishedCluesPayload = {
      catIndex: catIndex,
      clueIndex: clueIndex,
      currentCustomSet: { ...currentCustomSet },
      clueComplete: true,
    }
    dispatch(assignClue(assignCluePayload));
    dispatch(modifyFinishedClues(modifyFinishedCluesPayload));
  };

  const isClueIncomplete = (catIndex, clueIndex) => { 
    return currentGame.finishedClues2D[catIndex][clueIndex] === "incomplete";
  };
  const getCategoryName = (catIndex) => {
    return currentGame.gamePhase === "round1" ? 
      currentCustomSet.round1CategoryNames[catIndex] : 
      currentCustomSet.round2CategoryNames[catIndex]
  };

  return (
    <div className="game-board">
      {(currentGame.gamePhase === "round1" ? 
          currentCustomSet.round1Clues :
          currentCustomSet.round2Clues).map((_, catIndex) => (
            <div className="category" key={catIndex}>
              <div className={!currentGame.finishedCategories[catIndex] ? "category-name" : "category-name complete"}>
                <h3>{
                  !currentGame.finishedCategories[catIndex] ? getCategoryName(catIndex) : " "
                }</h3>
              </div>
              {currentGame.pointValues.map((pointValue, clueIndex) => (
                <div 
                  onClick={() => handleSelectClue(catIndex, clueIndex)} 
                  className={isClueIncomplete(catIndex, clueIndex) ? "point-cell" : "point-cell complete"} 
                  key={clueIndex}>
                  {isClueIncomplete(catIndex, clueIndex) &&
                    <h1>{pointValue}</h1>
                  }
                </div>
              ))}
            </div>
          ))
      }
    </div>
  );
};

export default GameBoard;