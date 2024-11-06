require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const moodRoutes = require('./routes/moodRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/mood', moodRoutes);
app.use('/resources', resourceRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
