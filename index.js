import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/routely', urlRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT }`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });