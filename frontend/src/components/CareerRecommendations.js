import React, { useState } from 'react';
import CareerPath from './CareerPath';
import SkillGap from './SkillGap';

function CareerRecommendations({ recommendations, userSkills, onReset }) {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="recommendations">
      <h2>Your Career Recommendations</h2>
      
      <div className="recommendations-list">
        {recommendations.map((job, index) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3>{index + 1}. {job.title}</h3>
              <span className="match-score">{job.match_score}% Match</span>
            </div>
            
            <p className="job-industry">{job.industry}</p>
            <p className="job-description">{job.description}</p>
            
            <div className="job-details">
              <p className="salary"> {job.salary_range_formatted}/year</p>
              <p className="growth"> Growth Score: {job.growth_score}/10</p>
            </div>

            <SkillGap 
              hasSkills={job.has_skills}
              missingSkills={job.missing_skills}
              gapPercentage={job.skill_gap_percentage}
            />

            <button 
              className="view-path-btn"
              onClick={() => setSelectedJob(job)}
            >
              View Career Path
            </button>
          </div>
        ))}
      </div>

      {selectedJob && (
        <CareerPath 
          job={selectedJob}
          careerPath={selectedJob.career_path}
          onClose={() => setSelectedJob(null)}
        />
      )}

      <button className="reset-btn" onClick={onReset}>
        Start New Assessment
      </button>
    </div>
  );
}

export default CareerRecommendations;