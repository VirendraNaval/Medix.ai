const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const symptomForm = document.getElementById('symptomForm');
const symptomsInput = document.getElementById('symptoms');
const durationInput = document.getElementById('duration');
const severityInput = document.getElementById('severity');
const severityValue = document.getElementById('severityValue');
const resultsContainer = document.getElementById('results');
const analysisContent = document.getElementById('analysisContent');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const suggestionsDropdown = document.getElementById('suggestions');

// Update severity value display
severityInput.addEventListener('input', (e) => {
  severityValue.textContent = e.target.value;
});

// Handle symptom input with suggestions
symptomsInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  
  if (query.length < 2) {
    suggestionsDropdown.classList.remove('show');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/symptoms/suggestions?query=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (data.suggestions && data.suggestions.length > 0) {
      displaySuggestions(data.suggestions);
      suggestionsDropdown.classList.add('show');
    } else {
      suggestionsDropdown.classList.remove('show');
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    suggestionsDropdown.classList.remove('show');
  }
});

// Display symptom suggestions
function displaySuggestions(suggestions) {
  suggestionsDropdown.innerHTML = suggestions
    .map((suggestion) => `
      <div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">
        ${suggestion}
      </div>
    `)
    .join('');
}

// Select a symptom suggestion
function selectSuggestion(symptom) {
  const currentValue = symptomsInput.value.trim();
  if (currentValue.endsWith(',')) {
    symptomsInput.value = currentValue + ' ' + symptom + ', ';
  } else {
    symptomsInput.value = symptom + ', ';
  }
  suggestionsDropdown.classList.remove('show');
  symptomsInput.focus();
}

// Handle form submission
symptomForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const symptoms = symptomsInput.value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const duration = durationInput.value.trim();
  const severity = severityInput.value;

  // Validation
  if (symptoms.length === 0) {
    showError('Please enter at least one symptom');
    return;
  }

  if (!duration) {
    showError('Please enter the duration of symptoms');
    return;
  }

  // Hide previous results and show loading
  resultsContainer.style.display = 'none';
  errorDiv.style.display = 'none';
  loadingDiv.style.display = 'block';

  try {
    const response = await fetch(`${API_BASE_URL}/symptoms/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symptoms,
        duration,
        severity: parseInt(severity, 10),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.error?.message || data.error || 'Failed to analyze symptoms';
      throw new Error(errorMessage);
    }

    // Handle different response structures
    const analysis = data.analysis || data;
    console.log('Analysis response:', analysis);
    
    if (!analysis.summary && !analysis.recommendations) {
      throw new Error('Invalid response format from server');
    }

    displayResults(analysis);
  } catch (error) {
    showError(error.message || 'An error occurred while analyzing symptoms');
  } finally {
    loadingDiv.style.display = 'none';
  }
});

// Display analysis results
function displayResults(analysis) {
  if (!analysis) {
    showError('No analysis data received');
    return;
  }

  let html = '';
  
  // Summary
  if (analysis.summary) {
    html += '<strong>📋 Summary:</strong><p>' + String(analysis.summary) + '</p>';
  }
  
  // Recommendations
  if (analysis.recommendations && Array.isArray(analysis.recommendations)) {
    html += '<strong>💡 Recommendations:</strong><ul>';
    analysis.recommendations.forEach((rec) => {
      html += `<li>${String(rec)}</li>`;
    });
    html += '</ul>';
  }

  // Urgency Level
  if (analysis.urgencyLevel) {
    const urgencyColor = {
      'critical': '#d32f2f',
      'high': '#f57c00',
      'moderate': '#fbc02d',
      'low': '#388e3c'
    }[analysis.urgencyLevel] || '#999';
    
    html += `<p><strong>⚠️ Urgency Level:</strong> <span style="color: ${urgencyColor}; font-weight: bold; text-transform: capitalize;">${String(analysis.urgencyLevel)}</span></p>`;
  }

  // Disclaimer
  if (analysis.disclaimer) {
    html += `<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin-top: 15px; font-size: 13px; color: #856404;">${String(analysis.disclaimer)}</div>`;
  }

  analysisContent.innerHTML = html;
  resultsContainer.style.display = 'block';
}

// Show error message
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  resultsContainer.style.display = 'none';
}

// Hide suggestions when clicking elsewhere
document.addEventListener('click', (e) => {
  if (e.target !== symptomsInput) {
    suggestionsDropdown.classList.remove('show');
  }
});
