import express from 'express'
import 'dotenv/config';
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import connectDB from './config/dbConnection.js';

connectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(errorHandler);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

app.listen(port, () => {
    console.log(`Server is running at port ${port}.`);
})