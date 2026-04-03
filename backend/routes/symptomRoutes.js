const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');

// POST /api/symptoms/analyze - Analyze patient symptoms
router.post('/analyze', symptomController.analyzeSymptoms);

// GET /api/symptoms/suggestions - Get symptom suggestions
router.get('/suggestions', symptomController.getSymptomSuggestions);

module.exports = router;
