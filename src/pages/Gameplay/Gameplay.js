import { useSelector } from "react-redux";

const Gameplay = () => {
  const currentCustomSet = useSelector(state => state.customSets.currentCustomSet);
  const currentUser = useSelector(state => state.user);

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
          <div className="progress-bars">
            <div className="round-1">
              <div className="fill"/>
              <p>Round 1</p>
            </div>
            { currentCustomSet.hasTwoRounds && 
              <div className="round-2">
                <div className="fill"/>
                <p>Round 2</p>
              </div>
            }
            <div className="final-clue">
              <div className="fill"/>
              <p>Final Clue</p>
            </div>
          </div>
        </div>
      </div>
      <div className="gameplay-content">
        <div className="game-board">
          
        </div>
      </div>
    </div>
  );
};

export default Gameplay;