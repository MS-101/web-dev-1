import bcrypt from "bcrypt";
import User from "../models/user.js";
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    signResetToken,
} from "../helpers/jwt-helpers.js";
import { StatusCodes } from "http-status-codes";

export const login = async (req, res) => {
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
};

export const register = async (req, res) => {
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
};

export const refresh = async (req, res) => {
    const { refreshToken } = req.body;

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
};

export const requestResetToken = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({
        where: {
            email: email,
        },
    });

    if (user === null)
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "User does not exist!",
        });

    const resetToken = await signResetToken(user);
};

export const resetPassword = async (req, res) => {
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

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.update({
            password: hashedPassword,
        });

        const accessToken = await signAccessToken(user);
        const refreshToken = await signRefreshToken(user);

        return res.status(StatusCodes.OK).json({
            message: "Login successfull!",
            user: {
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
};
