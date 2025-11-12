import React from 'react';

function SkillGap({ hasSkills, missingSkills, gapPercentage }) {
  return (
    <div className="skill-gap">
      <div className="skill-gap-header">
        <h4>Skills Analysis</h4>
        <span className="gap-percentage">
          {100 - gapPercentage}% Skills Match
        </span>
      </div>
      
      <div className="skills-comparison">
        <div className="has-skills">
          <h5>Skills You Have:</h5>
          <div className="skill-tags">
            {hasSkills.map(skill => (
              <span key={skill} className="skill-tag has">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        {missingSkills.length > 0 && (
          <div className="missing-skills">
            <h5>Skills to Learn:</h5>
            <div className="skill-tags">
              {missingSkills.map(skill => (
                <span key={skill} className="skill-tag missing">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillGap;