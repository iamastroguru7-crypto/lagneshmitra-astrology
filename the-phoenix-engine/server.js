// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON and static files
app.use(express.json());
app.use(express.static('Public')); // Match this with your folder name 'Public'

// API Route connection
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

// Server Init
app.listen(PORT, () => {
    console.log(`[SYSTEM_STATUS]: Phoenix Engine is active on port ${PORT}`);
});

