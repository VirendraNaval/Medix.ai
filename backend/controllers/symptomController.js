const llmService = require('../utils/llmService');
const validators = require('../utils/validators');

// Analyze symptoms and provide recommendations
const analyzeSymptoms = async (req, res, next) => {
  try {
    const { symptoms, duration, severity } = req.body;

    // Validate input
    const validation = validators.validateSymptomInput({ symptoms, duration, severity });
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    // Call LLM service for analysis
    const analysis = await llmService.analyzeSymptoms({
      symptoms,
      duration,
      severity,
    });

    res.json({
      success: true,
      analysis,
      disclaimer: 'This information is for educational purposes only. Please consult with a healthcare professional.',
    });
  } catch (error) {
    next(error);
  }
};

// Get symptom suggestions based on initial input
const getSymptomSuggestions = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    const suggestions = await llmService.getSymptomSuggestions(query);
    res.json({ suggestions });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeSymptoms,
  getSymptomSuggestions,
};
