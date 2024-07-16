import { Users } from '../models/users.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../helpers/jwt_helpers.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({
        where: {
            username: username
        },
    })

    if (user === null)
        return res.json('Login Failed!');
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
        const accessToken = await signAccessToken(user.idUser);
        const refreshToken = await signRefreshToken(user.idUser);
    
        return res.status(201).json({
            message: 'Registration successfull!',
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } else {
        return res.json('Login Failed!');
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const userWithUsername = await Users.findOne({
        where: {
            username: username
        }
    });
    
    if (userWithUsername != null)
        return res.status(400).json({ message: 'Username is occupied!' });

    const userWithEmail = await Users.findOne({
        where: {
            email: email
        }
    });

    if (userWithEmail != null)
        return res.status(400).json({ message: 'Email is occupied!' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
        username: username,
        email: email,
        password: hashedPassword
    });

    const accessToken = await signAccessToken(newUser.id);
    const refreshToken = await signRefreshToken(newUser.id);

    return res.status(201).json({
        message: 'Registration successfull!',
        accessToken: accessToken,
        refreshToken: refreshToken
    });
}

export const refresh = async (req, res) => {
    const { refreshToken } = req.body
    const userId = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(userId)
    const refToken = await signRefreshToken(userId)

    return res.status(201).json({
        message: 'Token refresh successfull!',
        accessToken: accessToken,
        refreshToken: refreshToken
    })
}