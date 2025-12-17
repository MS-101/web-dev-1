import express from "express";
import AuthController from "../controllers/auth-controller.js";
import {
	authRefreshToken,
	authResetToken,
} from "../middlewares/auth-middlewares.js";

const authRoute = express.Router();

authRoute.post("/login", AuthController.login);
authRoute.post("/register", AuthController.register);
authRoute.post("/refresh", authRefreshToken, AuthController.refresh);
authRoute.post("/request-password-reset", AuthController.requestPasswordReset);
authRoute.post("/reset-password", authResetToken, AuthController.resetPassword);

export default authRoute;
