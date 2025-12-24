import bcrypt from "bcrypt";
import User from "../models/user.js";
import {
	signAccessToken,
	signRefreshToken,
	signResetToken,
} from "../helpers/jwt-helpers.js";
import { sendEmail } from "../helpers/email-helpers.js";
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
					date: user.date,
					username: user.username,
					email: user.email,
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

		let user = await User.scope("auth").findOne({
			where: {
				email: usernameOrEmail,
			},
		});

		if (user === null)
			user = await User.scope("auth").findOne({
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
					date: user.date,
					username: user.username,
					email: user.email,
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
		const { authUser } = req.body;

		try {
			const accessToken = await signAccessToken(authUser);
			const newRefreshToken = await signRefreshToken(authUser);

			return res.status(StatusCodes.OK).json({
				message: "Token refresh successfull!",
				user: {
					id: authUser.id,
					date: authUser.date,
					username: authUser.username,
					email: authUser.email,
				},
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

	static async requestPasswordReset(req, res) {
		const { email } = req.body;

		const user = await User.scope("auth").findOne({
			where: {
				email: email,
			},
		});

		if (user === null)
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "User with this email does not exist!",
			});

		try {
			const resetToken = await signResetToken(user);

			const passwordResetUrl = `${process.env.BASE_URL}/reset-password?reset-token=${resetToken}`;

			console.log("Generated password reset url: " + passwordResetUrl);

			const success = await sendEmail(
				email,
				"Banter password reset request",
				`
					<p>We have received a request for password reset of your account. If you did not send this request you can ignore this message.</p>

					<h3>Click the following button if you wish to change your password:</h3>

					<a href="${passwordResetUrl}">
						<button>Reset password</button>
					</a>
				`
			);

			if (!success) {
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					message: "Failed to send reset email!",
				});
			}

			return res.status(StatusCodes.OK).json({
				message: "Reset token sent to email!",
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Password reset failed!",
			});
		}
	}

	static async resetPassword(req, res) {
		const { authUser, password } = req.body;

		try {
			const user = await User.findOne({
				where: {
					email: authUser.email,
				},
			});

			if (!user) throw new Error("User was not found!");

			const hashedPassword = await bcrypt.hash(password, 10);

			const updatedUser = await user.update({
				password: hashedPassword,
			});

			return res.status(StatusCodes.OK).json({
				message: "Password reset successful!",
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Password reset failed!",
			});
		}
	}
}

export default AuthController;
