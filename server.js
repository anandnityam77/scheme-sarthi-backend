const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const schemeRoutes = require('./routes/schemeRoutes');

dotenv.config();


connectDB();


const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/schemes', schemeRoutes);


app.get('/', (req, res) => {
    res.send('Scheme Sarthi API is working perfectly!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});