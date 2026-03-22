const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const schemeRoutes = require('./routes/schemeRoutes');

// Load environment variables (aapka MongoDB link)
dotenv.config();

// Connect to the Database
connectDB();

// Initialize the Express app
const app = express();

// Middleware (Security and JSON parsing)
app.use(cors());
app.use(express.json());

// API Routes (Aapke Banaye Hue Doors)
app.use('/api/users', userRoutes);
app.use('/api/schemes', schemeRoutes);

// A simple test route
app.get('/', (req, res) => {
    res.send('Scheme Sarthi API is working perfectly!');
});

// Start the server aur usko zinda (awake) rakho!
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});