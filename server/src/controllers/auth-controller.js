import bcrypt from "bcrypt";
import User from "../models/user.js";
import {
	extractToken,
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from "../helpers/jwt-helpers.js";
import { StatusCodes } from "http-status-codes";

class AuthController {
	static async register(req, res) {
		const { username, email, password } = req.body;

		const userWithUsername = await User.findOne({
			where: {
				username: username,
			},
		});

		if (userWithUsername != null)
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: "Username is occupied!",
			});

		const userWithEmail = await User.findOne({
			where: {
				email: email,
			},
		});

		if (userWithEmail != null)
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: "Email is occupied!",
			});

		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await User.create({
				username: username,
				email: email,
				password: hashedPassword,
			});

			const accessToken = await signAccessToken(user);
			const refreshToken = await signRefreshToken(user);

			return res.status(StatusCodes.CREATED).json({
				message: "Registration successfull!",
				user: {
					id: user.id,
					email: user.email,
					username: user.username,
				},
				accessToken: accessToken,
				refreshToken: refreshToken,
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Registration failed!",
			});
		}
	}

	static async login(req, res) {
		const { usernameOrEmail, password } = req.body;

		let user = await User.findOne({
			where: {
				email: usernameOrEmail,
			},
		});

		if (user === null)
			user = await User.findOne({
				where: {
					username: usernameOrEmail,
				},
			});

		if (user === null)
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "User does not exist!",
			});

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch)
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: "Password is incorrect!",
			});

		try {
			const accessToken = await signAccessToken(user);
			const refreshToken = await signRefreshToken(user);

			return res.status(StatusCodes.OK).json({
				message: "Login successfull!",
				user: {
					id: user.id,
					email: user.email,
					username: user.username,
				},
				accessToken: accessToken,
				refreshToken: refreshToken,
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Login Failed!",
			});
		}
	}

	static async refresh(req, res) {
		const refreshToken = extractToken(req.headers);

		try {
			const user = await verifyRefreshToken(refreshToken);

			const accessToken = await signAccessToken(user);
			const newRefreshToken = await signRefreshToken(user);

			return res.status(StatusCodes.OK).json({
				message: "Token refresh successfull!",
				accessToken: accessToken,
				refreshToken: newRefreshToken,
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Token refresh failed!",
			});
		}
	}
}

export default AuthController;
