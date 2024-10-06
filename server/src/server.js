import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth-route.js';

const app = express();

// middleware
app.use(cors())
app.use(express.json());

// routes
app.use('/auth', authRoute);

app.listen(8081, () => {
    console.log('Server is listening...');
});
