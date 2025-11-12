import React, { useState } from 'react';

function SkillSelector({ availableSkills, onNext }) {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="skill-selector">
      <h2>Select Your Skills</h2>
      <p>Choose all the skills you currently have:</p>
      
      <div className="skills-grid">
        {availableSkills.map(skill => (
          <label key={skill.id} className="skill-checkbox">
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill.id)}
              onChange={() => toggleSkill(skill.id)}
            />
            <span className="skill-label">{skill.name}</span>
          </label>
        ))}
      </div>

      <button 
        className="next-btn"
        onClick={() => onNext(selectedSkills)}
        disabled={selectedSkills.length === 0}
      >
        Next Step →
      </button>
    </div>
  );
}

export default SkillSelector;