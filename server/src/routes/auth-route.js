import express from 'express';
import { login, register, refresh, resetPassword } from '../controllers/auth-controller.js'

const authRoute = express.Router();

authRoute.post('/login', login);
authRoute.post('/register', register);
authRoute.post('/refresh', refresh);
authRoute.post('/reset-password/generate-token', generateResetToken);
authRoute.post('/reset-password/verify-token', verifyResetToken);
authRoute.post('/reset-password', resetPassword);

export default authRoute