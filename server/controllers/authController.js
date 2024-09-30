import { User } from '../models/user.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../helpers/jwt_helpers.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { name, password } = req.body;

    const user = await User.findOne({
        where: {
            name: name
        },
    })

    if (user === null)
        return res.json('Login Failed!');
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
        const accessToken = await signAccessToken(user.idUser);
        const refreshToken = await signRefreshToken(user.idUser);
    
        return res.status(201).json({
            message: 'Login successfull!',
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } else {
        return res.json('Login Failed!');
    }
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userWithName = await User.findOne({
        where: {
            name: name
        }
    });
    
    if (userWithName != null)
        return res.status(400).json({ message: 'Username is occupied!' });

    const userWithEmail = await User.findOne({
        where: {
            email: email
        }
    });

    if (userWithEmail != null)
        return res.status(400).json({ message: 'Email is occupied!' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        name: name,
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
    const newRefreshToken = await signRefreshToken(userId)

    return res.status(201).json({
        message: 'Token refresh successfull!',
        accessToken: accessToken,
        refreshToken: newRefreshToken
    })
}