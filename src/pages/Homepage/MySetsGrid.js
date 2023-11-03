import './MySetsGrid.css';

import { useSelector } from 'react-redux';
import useSyncMyCustomSetsWithFirestore from "../../hooks/useSyncMyCustomSetsWithFirestore";
import { firestoreTimestampToString } from "../../utils/DateUtils";

import LockFill from "../../images/Homepage/LockFill.png";
import Ellipsis from "../../images/Homepage/Ellipsis.png";

const MySetsGrid = () => {
  useSyncMyCustomSetsWithFirestore();

  const myCustomSets = useSelector(state => state.customSets.myCustomSets);
  const user = useSelector(state => state.user);
  
  function getUserInitials(name) {
    if (!name) { return ""; }
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...name.matchAll(rgx)] || [];
    
    initials = (
      (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();

    return initials;
  }

  return (
    <div className="my-sets-grid-container">
      {myCustomSets.map((myCustomSet, index) => (
        <div key={index} className="my-set-preview-card">
          <div className="header">
            <div className="lhs">
              { !myCustomSet.isPublic &&
                <img src={LockFill} alt="Lock icon"/>
              }
              <h4>{myCustomSet.title}</h4>
            </div>
            <button className="more-options">
              <img src={Ellipsis} alt="Ellipsis"/>
            </button>
          </div>
          <div className="set-info">
            <p>{myCustomSet.hasTwoRounds ? 2 : 1} rounds, {myCustomSet.numClues} clues</p>
            <p style={{margin: '0px 10px'}}>•</p>
            <p>{myCustomSet.numPlays} plays</p>
          </div>
          { myCustomSet.description &&
            <p className="set-description">{myCustomSet.description}</p>
          }
          <div className="user-info">
            <button className="user-initials-icon">
              <p>{getUserInitials(user.name)}</p>
            </button>
            <div className="set-creator-details">
              <p>{user.name}</p>
              <p className="date-string">Created {firestoreTimestampToString(myCustomSet.dateCreated)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MySetsGrid;