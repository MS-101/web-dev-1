import { Users } from '../models/users.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({
            where : {
                username: username,
                password: password,
            },
        })
    
        if (user === null) {
            return res.json('Login failed!');
        } else {
            return res.json('Login Successfull!');
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } 
};

