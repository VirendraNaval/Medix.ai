// LLM Configuration - Groq API
// Uses Groq's fast inference API with mixtral-8x7b-32768 model
module.exports = {
  provider: process.env.LLM_PROVIDER || 'groq',
  apiKey: process.env.LLM_API_KEY,
  model: process.env.LLM_MODEL || 'mixtral-8x7b-32768',
  temperature: parseFloat(process.env.LLM_TEMPERATURE || '0.7'),
  maxTokens: parseInt(process.env.LLM_MAX_TOKENS || '1024'),
};

