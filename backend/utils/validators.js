// Input validation utilities

const validateSymptomInput = ({ symptoms, duration, severity }) => {
  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return {
      isValid: false,
      error: 'Symptoms must be a non-empty array',
    };
  }

  if (!duration || typeof duration !== 'string') {
    return {
      isValid: false,
      error: 'Duration must be a valid string (e.g., "2 days", "1 week")',
    };
  }

  if (severity === undefined || severity === null) {
    return {
      isValid: false,
      error: 'Severity must be provided (1-10)',
    };
  }

  const severityNum = parseInt(severity, 10);
  if (isNaN(severityNum) || severityNum < 1 || severityNum > 10) {
    return {
      isValid: false,
      error: 'Severity must be a number between 1 and 10',
    };
  }

  // Validate symptom strings
  if (symptoms.some((symptom) => typeof symptom !== 'string' || symptom.trim().length === 0)) {
    return {
      isValid: false,
      error: 'All symptoms must be non-empty strings',
    };
  }

  return { isValid: true };
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().substring(0, 500); // Limit input length
};

module.exports = {
  validateSymptomInput,
  sanitizeInput,
};
