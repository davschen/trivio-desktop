import './Homepage.css';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { assignCurrentCustomSet } from "../../redux/customSets/customSetsSlice";

import NavigationBar from "../Shared/NavigationBar";
import MySetsGrid from "./MySetsGrid";
import RecommendedSetsGrid from "./RecommendedSetsGrid";

import ChevronRight from "../../images/Homepage/ChevronRight.png";
import PlusSign from "../../images/Homepage/PlusSign.png";
import SetPreview from "../SetPreview/SetPreview";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedSetID, setSelectedSetID] = useState(null);
  const handleSetClick = (customSet) => {
    dispatch(assignCurrentCustomSet(customSet));
    setSelectedSetID(customSet.id);
    navigate(`/browse?jbv=${customSet.id}`);
  }
  
  return (
    <div className="homepage-parent-container">
      <div style={{filter: selectedSetID && "blur(40px)"}} className="homepage">
        <NavigationBar/>
        <div className="contents-container">
          <div className="all-sets">
            <div className="sets-section">
              <div className="section-heading">
                <div className="titles">
                  <h3>My Sets</h3>
                  <img src={ChevronRight} alt="Right-facing chevron"/>
                </div>
                <button className="build-button">
                  <img src={PlusSign} alt="Plus sign"/>
                  <p>Build a Set</p>
                </button>
              </div>
              <MySetsGrid onSetClick={handleSetClick}/>
            </div>
            <div className="sets-section">
              <div className="section-heading">
                <div className="titles">
                  <h3>Trending Now</h3>
                </div>
                <button className="see-more-button">
                  <p>See More</p>
                </button>
              </div>
              <RecommendedSetsGrid onSetClick={handleSetClick}/>
            </div>
          </div>
        </div>
      </div>
      {selectedSetID && (
        <SetPreview
          onClose={() => {
            setSelectedSetID(null);
            navigate('/browse');
          }}
        />
      )}
    </div>
  );
}

export default Homepage;