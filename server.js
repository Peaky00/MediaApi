require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api'); // Import your route files

const userRoutes = require('./routes/api/userRoutes'); // Adjust the filename
const thoughtRoutes = require('./routes/api/thoughtRoutes'); // Adjust the filename

const app = express();
const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using the environment variable
mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    bufferCommands: false, // Disable command buffering (or set a higher timeout value)
  });

// Check for MongoDB connection errors
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use your API routes
app.use('/api', routes);
app.use('/api', userRoutes);
app.use('/api',thoughtRoutes);

// Error handling middleware (customize as needed)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
