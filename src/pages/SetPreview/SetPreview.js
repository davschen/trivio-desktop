import './SetPreview.css';
import CloseButton from "../../images/SetPreview/CloseButton.png";
import { useSelector } from "react-redux";

const SetPreview = () => {
  const currentCustomSet = useSelector(state => state.customSets.currentCustomSet);
  const setIDAuthorDict = useSelector(state => state.customSets.setIDAuthorDict);

  return (
    <div className="set-preview">
      <div className="contents-card">
        <div className="heading">
          <h2>{currentCustomSet.title}</h2>
          <img src={CloseButton} alt="Xmark button"/>
        </div>
        <div className="subheading">
          <p>Created by {setIDAuthorDict[currentCustomSet.id]} on {currentCustomSet.dateCreated}</p>
        </div>
        <p className="description">{currentCustomSet.description}</p>
        <div className="host-options-buttons">
          <button className="free-option">
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
              <div>
                <p>{categoryName}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="category-previews">
          <div className="titles">
            <h4>Round 2 Preview</h4>
            <p>({currentCustomSet.round2Len} categories)</p>
          </div>
          <div className="category-list">
            {currentCustomSet.round2CategoryNames.map((categoryName, index) => (
              <div>
                <p>{categoryName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPreview;