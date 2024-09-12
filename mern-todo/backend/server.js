const express = require('express'); // Import express
const mongoose = require('mongoose'); // Import mongoose
const dotenv = require('dotenv'); // Import dotenv for environment variables
const cors = require('cors'); // Import cors

// Initialize app
const app = express();

// Configure dotenv to read .env file
dotenv.config();

// Middleware to parse JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Import routes
const taskRoutes = require('./routes/taskRoutes'); 

// Use routes
app.use('/api', taskRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Set the port from the .env file or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
