import {
	extractToken,
	verifyAccessToken,
	verifyRefreshToken,
	verifyResetToken,
} from "../helpers/jwt-helpers.js";
import { StatusCodes } from "http-status-codes";

export const authOptionalAccessToken = async (req, res, next) => {
	const accessToken = extractToken(req.headers);

	if (!accessToken) {
		return next();
	}

	verifyAccessToken(accessToken)
		.then((user) => {
			req.body.authUser = user;

			next();
		})
		.catch((error) => {
			console.log(error);

			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: "Invalid access token!",
			});
		});
};

export const authAccessToken = async (req, res, next) => {
	const { authUser } = req.body;

	if (!authUser) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: "Access token missing!",
		});
	}

	next();
};

export const authRefreshToken = async (req, res, next) => {
	const refreshToken = extractToken(req.headers);

	if (!refreshToken) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: "Refresh token is missing!",
		});
	}

	verifyRefreshToken(refreshToken)
		.then((user) => {
			req.body.authUser = user;

			next();
		})
		.catch((error) => {
			console.log(error);

			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: "Invalid access token!",
			});
		});
};

export const authResetToken = async (req, res, next) => {
	const resetToken = extractToken(req.headers);

	if (!resetToken) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: "Password reset token missing!",
		});
	}

	verifyResetToken(resetToken)
		.then((user) => {
			req.body.authUser = user;

			next();
		})
		.catch((error) => {
			console.log(error);

			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: "Invalid password reset token!",
			});
		});
};
