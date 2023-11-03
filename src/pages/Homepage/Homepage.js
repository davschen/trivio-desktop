import { useState } from "react";
import './Homepage.css';

import NavigationBar from "../Shared/NavigationBar";
import MySetsGrid from "./MySetsGrid";
import RecommendedSetsGrid from "./RecommendedSetsGrid";

import ChevronRight from "../../images/Homepage/ChevronRight.png";
import PlusSign from "../../images/Homepage/PlusSign.png";
import SetPreview from "../SetPreview/SetPreview";

const Homepage = () => {
  const [showSetPreview, setShowSetPreview] = useState(false);
  
  return (
    <div className="main-container">
      <div className="homepage">
        <NavigationBar/>
        <div className="homepage-container">
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
              <MySetsGrid/>
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
              <RecommendedSetsGrid/>
            </div>
          </div>
        </div>
      </div>
      {showSetPreview && <SetPreview/>}
    </div>
  );
}

export default Homepage;