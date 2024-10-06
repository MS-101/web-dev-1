import express from 'express';
import { login, register, refresh } from '../controllers/auth-controller.js'

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/register', register);
authRoute.post('/refresh', refresh);

export default authRoute