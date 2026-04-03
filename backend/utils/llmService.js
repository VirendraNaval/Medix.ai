const llmConfig = require('../config/llm.config');

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

// Analyze symptoms using Groq API
const analyzeSymptoms = async ({ symptoms, duration, severity }) => {
  try {
    console.log('Calling Groq API for symptom analysis...');
    console.log('Symptoms:', symptoms, 'Duration:', duration, 'Severity:', severity);

    const symptomList = symptoms.join(', ');
    const prompt = `You are a healthcare assistant. Analyze the following symptom information and respond with ONLY valid JSON (no markdown, no extra text).

Symptoms: ${symptomList}
Duration: ${duration}
Severity (1-10): ${severity}

Return ONLY this JSON format:
{
  "summary": "Brief 1-2 sentence summary of the symptoms",
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ],
  "whenToSeekHelp": [
    "Warning sign 1",
    "Warning sign 2",
    "Warning sign 3"
  ],
  "safetyTips": [
    "Safety tip 1",
    "Safety tip 2"
  ]
}`;

    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${llmConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: llmConfig.model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: llmConfig.maxTokens,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Groq API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    let analysis;
    
    try {
      const responseText = data.choices[0].message.content.trim();
      analysis = JSON.parse(responseText);
    } catch (parseError) {
      console.warn('Failed to parse JSON response, using text as summary');
      analysis = {
        summary: data.choices[0].message.content,
        recommendations: [],
        whenToSeekHelp: [],
        safetyTips: [],
      };
    }

    console.log('Groq API response received');

    // Determine urgency level based on severity
    let urgencyLevel = 'low';
    if (severity >= 7) {
      urgencyLevel = 'high';
    } else if (severity >= 5) {
      urgencyLevel = 'moderate';
    }

    return {
      ...analysis,
      urgencyLevel,
      disclaimer:
        'This is an AI-assisted analysis for informational purposes only and is not a medical diagnosis. Always consult with a qualified healthcare professional for proper diagnosis and treatment.',
    };
  } catch (error) {
    console.error('Error in analyzeSymptoms:', error);
    throw new Error(`Failed to analyze symptoms: ${error.message}`);
  }
};

// Get symptom suggestions using Groq API
const getSymptomSuggestions = async (query) => {
  try {
    console.log('Getting suggestions from Groq API for query:', query);

    if (!query || query.trim().length === 0) {
      return getBasicSuggestions(query);
    }

    const prompt = `You are a healthcare assistant. The user is typing symptom search terms. Provide 5 relevant, common health symptoms or keywords that match or are similar to: "${query}"

Return only a comma-separated list of 5 symptoms/keywords, nothing else. Example format: "Fever, Cough, Chills, Fatigue, Body Aches"`;

    const response = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${llmConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: llmConfig.model,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 256,
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      console.warn(`Groq API error for suggestions: ${response.status}`);
      return getBasicSuggestions(query);
    }

    const data = await response.json();
    const suggestionText = data.choices[0].message.content;

    const suggestions = suggestionText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .slice(0, 5);

    console.log('Suggestions from Groq:', suggestions);

    return suggestions;
  } catch (error) {
    console.warn('Error in getSymptomSuggestions:', error);
    return getBasicSuggestions(query);
  }
};

// Fallback suggestions if API fails - minimal fallback with common symptoms
const getBasicSuggestions = (query) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const commonSymptoms = [
    'Fever',
    'Cough',
    'Headache',
    'Fatigue',
    'Sore throat',
  ];

  return commonSymptoms.filter((symptom) =>
    symptom.toLowerCase().includes(query.toLowerCase())
  );
};

// Export functions
module.exports = {
  analyzeSymptoms,
  getSymptomSuggestions,
};
