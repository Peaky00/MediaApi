const router = require('express').Router();
const userRoutes = require('./userRoutes'); // Import your user routes
const thoughtRoutes = require('./thoughtRoutes'); // Import your thought routes

// Define API routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
