import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../helpers/jwt-helpers.js';

export const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    let user = await User.findOne({
        where: {
            email: usernameOrEmail
        },
    })

    if (user === null)
        user = await User.findOne({
            where: {
                username: usernameOrEmail
            },
        })

    if (user === null)
        return res.status(401).json({
            message: 'Login Failed!'
        });
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch)
        return res.status(401).json({
            message: 'Login Failed!'
        });

    try {
        const accessToken = await signAccessToken(user);
        const refreshToken = await signRefreshToken(user);
    
        return res.status(200).json({
            message: 'Login successfull!',
            user: {
                email: user.email,
                username: user.username
            },
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        console.log(error)

        return res.status(401).json({
            message: 'Login Failed!'
        });
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const userWithUsername = await User.findOne({
        where: {
            username: username
        }
    });
    
    if (userWithUsername != null)
        return res.status(401).json({
            message: 'Username is occupied!' }
        );

    const userWithEmail = await User.findOne({
        where: {
            email: email
        }
    });

    if (userWithEmail != null)
        return res.status(401).json({
            message: 'Email is occupied!'
        });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });
    
        const accessToken = await signAccessToken(user);
        const refreshToken = await signRefreshToken(user);
    
        return res.status(201).json({
            message: 'Registration successfull!',
            user: {
                email: user.email,
                username: user.username
            },
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        console.log(error)

        return res.status(401).json({
            message: 'Registration failed!'
        })
    }
}

export const refresh = async (req, res) => {
    const { refreshToken } = req.body

    try {
        const user = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(user)
        const newRefreshToken = await signRefreshToken(user)
    
        return res.status(200).json({
            message: 'Token refresh successfull!',
            accessToken: accessToken,
            refreshToken: newRefreshToken
        })
    } catch (error) {
        console.log(error)

        return res.status(403).json({
            message: 'Token refresh failed!'
        })
    }
}