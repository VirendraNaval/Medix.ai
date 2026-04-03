# Healthcare Symptom Checker

A web-based application that helps users understand their symptoms by leveraging Large Language Models (LLMs) for general health information and recommendations. This tool provides educational health information and encourages users to consult with healthcare professionals.

## ⚠️ Disclaimer

This application provides **general health information only** and is **not a substitute for professional medical advice**. The analysis is for educational purposes. Always consult with a qualified healthcare professional for accurate diagnosis and treatment.

## 🚀 Quick Start (5 Minutes)

1. **Get Groq API Key**: Sign up at [console.groq.com](https://console.groq.com) and get a free API key

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   echo "LLM_PROVIDER=groq" > .env
   echo "LLM_API_KEY=your_key_here" >> .env
   echo "LLM_MODEL=llama-3.1-8b-instant" >> .env
   node server.js
   ```

3. **Frontend Setup** (new terminal):
   ```bash
   python -m http.server 8000 --directory frontend
   ```

4. **Open Browser**: Go to `http://localhost:8000`

## Features

- 🔍 **Symptom Analysis**: Input symptoms and receive general health information
- 💡 **Smart Suggestions**: Autocomplete suggestions for common symptoms
- 📊 **Severity Assessment**: Rate symptom severity on a 1-10 scale
- ⚡ **Fast API**: Express.js backend with LLM integration
- 🎨 **Modern UI**: Responsive frontend with intuitive design
- 🔐 **Error Handling**: Comprehensive error handling and validation

## Project Structure

```
healthcare-symptom-checker/
├── backend/
│   ├── config/
│   │   └── llm.config.js           # LLM configuration
│   ├── controllers/
│   │   └── symptomController.js    # API controllers
│   ├── routes/
│   │   └── symptomRoutes.js        # API routes
│   ├── middleware/
│   │   └── errorHandler.js         # Error handling middleware
│   ├── models/
│   │   └── symptomQuery.js         # Database model (optional)
│   ├── utils/
│   │   ├── llmService.js           # LLM integration service
│   │   └── validators.js           # Input validation utilities
│   ├── .env                        # Environment variables
│   ├── server.js                   # Express server entry point
│   └── package.json                # Backend dependencies
├── frontend/
│   ├── index.html                  # HTML markup
│   ├── style.css                   # Styling
│   └── script.js                   # Client-side logic
├── README.md                       # Project documentation
└── .gitignore                      # Git ignore file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Python 3 (for serving frontend)
- A Groq API key (free tier available at [console.groq.com](https://console.groq.com))

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file in the `backend/` directory with:
   ```
   LLM_PROVIDER=groq
   LLM_API_KEY=your_groq_api_key_here
   LLM_MODEL=llama-3.1-8b-instant
   LLM_TEMPERATURE=0.7
   LLM_MAX_TOKENS=1024
   ```
   
   Replace `your_groq_api_key_here` with your actual Groq API key.

4. **Start the backend server**:
   ```bash
   node server.js
   ```
   
   The backend will run on `http://localhost:5000`
   
   You should see:
   ```
   Healthcare Symptom Checker Server running on port 5000
   Environment: development
   ```

### Frontend Setup

1. **Open a new terminal** (keep the backend running in the first terminal)

2. **Navigate to project root**:
   ```bash
   cd d:\Else\healthcare-symptom-checker
   ```

3. **Start frontend server**:
   ```bash
   python -m http.server 8000 --directory frontend
   ```
   
   The frontend will be accessible at `http://localhost:8000`

4. **Open in browser**:
   - Go to `http://localhost:8000`
   - You should see the Healthcare Symptom Checker interface

## Running the Project Smoothly

### Quick Start (All in One)

**Make sure you have two terminals open:**

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
python -m http.server 8000 --directory frontend
```

Then open `http://localhost:8000` in your browser.

### Troubleshooting

**Port Already in Use:**
If you get "Address already in use" error on port 5000:
```powershell
# Windows PowerShell
Stop-Process -Name node -Force
```

Then restart the backend server.

**Module Not Found:**
If you see "Cannot find module" error:
```bash
# Reinstall dependencies
cd backend
rm -r node_modules
npm install
node server.js
```

**Groq API Errors:**
- Verify your API key is correct in `.env`
- Check internet connection
- Ensure you have available API quota at [console.groq.com](https://console.groq.com)
- Check server logs for detailed error messages

**Frontend Not Loading:**
- Ensure backend is running and accessible at `http://localhost:5000`
- Check browser console (F12) for any JavaScript errors
- Verify the `API_BASE_URL` in `frontend/script.js` matches your backend URL

## How to Use the Application

1. **Open the App**: Navigate to `http://localhost:8000` in your browser

2. **Enter Symptoms**: 
   - Type one or more symptoms in the "Symptoms" field
   - Autocomplete suggestions will appear as you type
   - Separate multiple symptoms with commas (e.g., "fever, cough")

3. **Duration**: Enter how long you've had the symptoms (e.g., "2 days", "1 week")

4. **Severity**: Use the slider to rate the severity from 1 (mild) to 10 (severe)

5. **Analyze**: Click "Analyze Symptoms" button

6. **View Results**: The app will show:
   - 📋 **Summary**: Overview of your symptoms
   - 💡 **Recommendations**: Wellness suggestions
   - 🚨 **When to Seek Help**: Warning signs requiring medical attention
   - 🛡️ **Safety Tips**: Preventive measures
   - **Urgency Level**: Color-coded severity (Low/Moderate/High)

## API Endpoints

### Health Check
- **GET** `/health` - Server health status

### Symptom Analysis
- **POST** `/api/symptoms/analyze` - Analyze symptoms based on user input
  ```json
  {
    "symptoms": ["fever", "cough"],
    "duration": "2 days",
    "severity": 7
  }
  ```

- **GET** `/api/symptoms/suggestions?query=<symptom>` - Get autocomplete suggestions

## Configuration

### LLM Integration

The `config/llm.config.js` file contains LLM settings:

- `provider`: LLM service provider (openai, anthropic, etc.)
- `apiKey`: API authentication key
- `model`: Model name/ID
- `temperature`: Response randomness (0-1)
- `maxTokens`: Maximum response length
- `systemPrompt`: System instruction for the LLM

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `LLM_PROVIDER` | LLM provider | openai |
| `LLM_API_KEY` | API key | - |
| `LLM_MODEL` | Model name | gpt-3.5-turbo |
| `LLM_TEMPERATURE` | Temperature | 0.7 |
| `LLM_MAX_TOKENS` | Max tokens | 500 |
| `CORS_ORIGIN` | CORS allowed origin | * |

## Development

### Running Tests (Optional)
```bash
npm test
```

### Code Structure Best Practices

- **Controllers**: Handle HTTP requests and responses
- **Routes**: Define API endpoints
- **Services**: Business logic and external API calls
- **Middleware**: Request/response processing
- **Validators**: Input validation and sanitization

## Integrating with LLM APIs

### OpenAI Example

Replace the mock response in `backend/utils/llmService.js`:

```javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${llmConfig.apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: llmConfig.model,
    messages: [{ role: 'user', content: prompt }],
    temperature: llmConfig.temperature,
    max_tokens: llmConfig.maxTokens,
  }),
});
const data = await response.json();
return data.choices[0].message.content;
```

## Security Considerations

- Never commit `.env` file with real API keys
- Validate all user inputs on the backend
- Implement rate limiting for production
- Use HTTPS in production
- Consider adding authentication for user data storage
- Implement logging and monitoring

## Future Enhancements

- [ ] User authentication and history
- [ ] Database integration for symptom tracking
- [ ] Multiple language support
- [ ] Mobile app development
- [ ] Advanced symptom matching algorithms
- [ ] Integration with real medical databases
- [ ] Doctor recommendation system
- [ ] Voice input support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

## Acknowledgments

- Built with Express.js and modern web technologies
- Powered by Large Language Models
- Inspired by accessible healthcare technology

---

**Last Updated**: March 2026

**Note**: This is an educational project. For real-world healthcare applications, extensive testing, compliance with medical regulations (HIPAA, GDPR, etc.), and proper medical review are required.
