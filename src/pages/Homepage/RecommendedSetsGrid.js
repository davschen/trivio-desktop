import './RecommendedSetsGrid.css';

import { useSelector } from 'react-redux';
import useSyncRecommendedSets from "../../hooks/useSyncRecommendedSets";

import LockFill from "../../images/Homepage/LockFill.png";
import Ellipsis from "../../images/Homepage/Ellipsis.png";
import { getUserInitials } from "../../utils/StringUtils";

const RecommendedSetsGrid = (props) => {
  useSyncRecommendedSets();
  const recommendedSets = useSelector(state => state.customSets.recommendedSets);
  const setIDAuthorDict = useSelector(state => state.customSets.setIDAuthorDict);

  function firestoreTimestampToString(timestampStr) {
    // Extract seconds using regex
    const match = timestampStr.match(/seconds=(\d+),/);
    if (!match) return null; // or handle the error
  
    const seconds = parseInt(match[1], 10);
    const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  
    // Format the date as MM/DD/YYYY
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="sets-grid-container">
      {recommendedSets.map((recommendedSet, index) => (
        <div onClick={() => props.onSetClick(recommendedSet)} key={index} className="set-preview-card">
          <div className="header">
            <div className="lhs">
              { !recommendedSet.isPublic &&
                <img src={LockFill} alt="Lock icon"/>
              }
              <h4>{recommendedSet.title}</h4>
            </div>
            <button className="more-options">
              <img src={Ellipsis} alt="Ellipsis"/>
            </button>
          </div>
          <div className="set-info">
            <p>{recommendedSet.hasTwoRounds ? 2 : 1} rounds, {recommendedSet.numClues} clues</p>
            <p style={{margin: '0px 10px'}}>•</p>
            <p>{recommendedSet.numPlays} plays</p>
          </div>
          <p className="set-description">{recommendedSet.description}</p>
          <div className="user-info">
            <button className="user-initials-icon">
              <p>{getUserInitials(setIDAuthorDict[recommendedSet.id])}</p>
            </button>
            <div className="set-creator-details">
              <p>{setIDAuthorDict[recommendedSet.id]}</p>
              <p className="date-string">Created {firestoreTimestampToString(recommendedSet.dateCreated)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedSetsGrid;