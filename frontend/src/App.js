import React, { useState, useEffect } from 'react';
import './App.css';
import { careerAPI } from './services/api';  // ← CORRECT PATH
import SkillSelector from './components/SkillSelector';  // ← CORRECT PATH
import InterestSelector from './components/InterestSelector';  // ← CORRECT PATH
import CareerRecommendations from './components/CareerRecommendations';  // ← CORRECT PATH

function App() {
  const [step, setStep] = useState(1);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [availableIndustries, setAvailableIndustries] = useState([]);
  const [userData, setUserData] = useState({
    skills: [],
    interests: [],
    experienceLevel: 'entry'
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [skills, industries] = await Promise.all([
        careerAPI.getAllSkills(),
        careerAPI.getAllIndustries()
      ]);
      setAvailableSkills(skills);
      setAvailableIndustries(industries);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSkillsSelect = (skills) => {
    setUserData({ ...userData, skills });
    setStep(2);
  };

  const handleInterestsSelect = (interests) => {
    setUserData({ ...userData, interests });
    setStep(3);
  };

  const handleExperienceSelect = async (experienceLevel) => {
    setLoading(true);
    const updatedUserData = { ...userData, experienceLevel };
    setUserData(updatedUserData);
    
    try {
      const results = await careerAPI.getRecommendations(updatedUserData);
      setRecommendations(results);
      setStep(4);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setUserData({
      skills: [],
      interests: [],
      experienceLevel: 'entry'
    });
    setRecommendations([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Career Path Finder</h1>
        <p>Discover your perfect career based on your skills and interests</p>
      </header>

      <main className="App-main">
        {loading && <div className="loading">Analyzing your profile...</div>}
        
        {step === 1 && (
          <SkillSelector
            availableSkills={availableSkills}
            onNext={handleSkillsSelect}
          />
        )}

        {step === 2 && (
          <InterestSelector
            availableIndustries={availableIndustries}
            onNext={handleInterestsSelect}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <div className="experience-selector">
            <h2>What's your experience level?</h2>
            <div className="experience-options">
              <button onClick={() => handleExperienceSelect('entry')}>
                Entry Level (0-2 years)
              </button>
              <button onClick={() => handleExperienceSelect('mid')}>
                Mid Level (2-5 years)
              </button>
              <button onClick={() => handleExperienceSelect('senior')}>
                Senior Level (5+ years)
              </button>
            </div>
            <button className="back-btn" onClick={() => setStep(2)}>Back</button>
          </div>
        )}

        {step === 4 && (
          <CareerRecommendations
            recommendations={recommendations}
            userSkills={userData.skills}
            onReset={resetQuiz}
          />
        )}
      </main>
    </div>
  );
}

export default App;