import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import sanitize from './middleware/sanitize.js';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/dbConnection.js';
import { globalLimiter } from './middleware/rateLimiter.js';

connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());
app.use(sanitize);
app.use(globalLimiter);

app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}.`);
    });
}

export default app;