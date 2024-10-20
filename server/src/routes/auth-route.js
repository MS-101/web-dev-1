import express from "express";
import {
    login,
    register,
    refresh,
    requestResetToken,
    resetPassword,
} from "../controllers/auth-controller.js";
import {
    authRefreshToken,
    authResetToken,
} from "../middlewares/auth-middlewares.js";

const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("/register", register);
authRoute.post("/refresh", authRefreshToken, refresh);
authRoute.post("/request-reset-token", requestResetToken);
authRoute.post("/reset-password", authResetToken, resetPassword);

export default authRoute;
