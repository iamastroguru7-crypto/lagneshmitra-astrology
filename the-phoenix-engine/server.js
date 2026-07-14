// server.js
const express = require('express');
const cors = require('cors'); // CORS add kiya taaki frontend-backend conflict na ho
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Cross-Origin Resource Sharing enable kiya
app.use(express.json());
app.use(express.static('Public')); // Tera frontend path

// API Route connection
const apiRoutes = require('./api/routes');
app.use('/api', apiRoutes);

// Catch-all route to handle client-side routing (important for SPA)
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/Public/index.html');
});

// Server Init with logging
app.listen(PORT, () => {
    console.log(`[SYSTEM_STATUS]: Phoenix Engine is fully operational on port ${PORT}`);
});
