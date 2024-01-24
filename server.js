const express = require('express');
require('dotenv').config();
const connectDB = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // Move this line to the top

app.use(bodyParser.json());
app.use(cors());

// Connect DB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
