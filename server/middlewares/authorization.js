import { verifyAccessToken } from '../helpers/jwt_helpers.js'

export const authRole = (roles) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]

        const idUser = await verifyAccessToken(token);
        
        // using the id of user I can retrieve list of assigned roles

        next();
    }
}