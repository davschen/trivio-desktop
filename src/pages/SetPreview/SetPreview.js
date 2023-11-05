import './SetPreview.css';
import CloseButton from "../../images/SetPreview/CloseButton.png";
import { useSelector } from "react-redux";
import { firestoreTimestampToString } from "../../utils/DateUtils";
import { useNavigate } from "react-router-dom";

const SetPreview = (props) => {
  const navigate = useNavigate();
  const currentCustomSet = useSelector(state => state.customSets.currentCustomSet);
  const user = useSelector(state => state.user);
  const setIDAuthorDict = useSelector(state => state.customSets.setIDAuthorDict);
  
  function getAuthorName() {
    if (currentCustomSet.userID === user.UUID) {
      return user.name;
    } else {
      return setIDAuthorDict[currentCustomSet.id];
    }
  };

  const launchLiveGame = () => {
    navigate("/waiting-room");
  };

  return (
    <div  className="set-preview">
      <div className="contents-card">
        <div className="heading">
          <h2>{currentCustomSet.title}</h2>
          <button onClick={() => props.onClose()}>
            <img src={CloseButton} alt="Xmark button"/>
          </button>
        </div>
        <div className="subheading">
          <p>
            Created by {getAuthorName()} on {
              firestoreTimestampToString(currentCustomSet.dateCreated)
            }
          </p>
        </div>
        <p className="description">{currentCustomSet.description}</p>
        <div className="host-options-buttons">
          <button onClick={() => launchLiveGame()} className="free-option">
            <div className="contents">
              <h4>Host for free</h4>
              <p>5 buzzer limit</p>
            </div>
          </button>
          <button className="trivio-plus-option">
            <div className="contents">
              <h4>Host with Trivio! Plus</h4>
              <p>Unlimited buzzers</p>
            </div>
          </button>
        </div>
        <div className="category-previews">
          <div className="titles">
            <h4>Round 1 Preview</h4>
            <p>({currentCustomSet.round1Len} categories)</p>
          </div>
          <div className="category-list">
            {currentCustomSet.round1CategoryNames.map((categoryName, index) => (
              <div className="category-name" key={index}>
                <p>{categoryName}</p>
              </div>
            ))}
          </div>
        </div>
        { currentCustomSet.hasTwoRounds &&
          <div style={{paddingTop: '40px'}} className="category-previews">
            <div className="titles">
              <h4>Round 2 Preview</h4>
              <p>({currentCustomSet.round2Len} categories)</p>
            </div>
            <div className="category-list">
              {currentCustomSet.round2CategoryNames.map((categoryName, index) => (
                <div className="category-name" key={index}>
                  <p>{categoryName}</p>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default SetPreview;