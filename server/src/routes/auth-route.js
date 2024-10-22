import express from "express";
import AuthController from "../controllers/auth-controller.js";
import { authRefreshToken } from "../middlewares/auth-middlewares.js";

const authRoute = express.Router();

authRoute.post("/login", AuthController.login);
authRoute.post("/register", AuthController.register);
authRoute.post("/refresh", authRefreshToken, AuthController.refresh);

export default authRoute;
