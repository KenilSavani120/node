import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import route from './routes/userRoutes.js';
import connectDb from './db/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// Middleware
app.use(express.json());

connectDb()

// Routes
app.use('/api/user', route);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



