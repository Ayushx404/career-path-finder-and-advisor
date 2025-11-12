import React, { useState } from 'react';

function InterestSelector({ availableIndustries, onNext, onBack }) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <div className="interest-selector">
      <h2>Select Your Interests</h2>
      <p>Which industries interest you?</p>
      
      <div className="interests-grid">
        {availableIndustries.map(industry => (
          <label key={industry} className="interest-checkbox">
            <input
              type="checkbox"
              checked={selectedInterests.includes(industry.toLowerCase())}
              onChange={() => toggleInterest(industry.toLowerCase())}
            />
            <span className="interest-label">{industry}</span>
          </label>
        ))}
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button 
          className="next-btn"
          onClick={() => onNext(selectedInterests)}
          disabled={selectedInterests.length === 0}
        >
          Next Step →
        </button>
      </div>
    </div>
  );
}

export default InterestSelector;