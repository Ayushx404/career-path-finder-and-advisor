const express = require('express');
const router = express.Router();
const RecommendationService = require('../services/recommendationService');

const recommendationService = new RecommendationService();

// Get all available skills for the questionnaire
router.get('/skills', (req, res) => {
  const skills = recommendationService.getAllSkills();
  res.json(skills);
});

// Get all industries
router.get('/industries', (req, res) => {
  const industries = recommendationService.getAllIndustries();
  res.json(industries);
});

// Get career recommendations based on user input
router.post('/recommend', (req, res) => {
  const { skills, interests, experienceLevel } = req.body;
  const recommendations = recommendationService.getRecommendations(
    skills,
    interests,
    experienceLevel
  );
  res.json(recommendations);
});

// Get career path for a specific job
router.get('/path/:jobTitle', (req, res) => {
  const { jobTitle } = req.params;
  const path = recommendationService.getCareerPath(jobTitle);
  res.json(path);
});

module.exports = router;