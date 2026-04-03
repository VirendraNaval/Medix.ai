require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const symptomRoutes = require('./routes/symptomRoutes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/symptoms', symptomRoutes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Healthcare Symptom Checker Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
