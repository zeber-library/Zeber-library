const express = require('express');
const app = express();
const mainRouter = require('./Routes/main'); // Main routes
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', mainRouter);

// Test route
app.get('/', (req, res) => {
    res.send("Hello Human!");
});

// Start server with error handling
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Failed to start server: ${err}`);
    } else {
        console.log(`Server running on http://localhost:${PORT}`);
    }
});
