import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import authRoute from './routes/authRoute.js'

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/auth', authRoute);

app.listen(8081, () => {
    console.log('Server is listening...');
});
