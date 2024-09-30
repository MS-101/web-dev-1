import jwt from "jsonwebtoken";

export const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            sub: String(userId),
        }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const options = {
            expiresIn: '5m',
            issuer: 'notreddit.com'
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err.message);
            resolve(token);
        })
     })
}

export const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.ACCESS_TOKEN_SECRET

        jwt.verify(token, secret, (err, payload) => {
            if (err) reject(err.message);
            resolve(payload.aud);
        })
    })
}

export const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            sub: String(userId)
        }
        const secret = process.env.REFRESH_TOKEN_SECRET
        const options = {
            expiresIn: '1y',
            issuer: 'notreddit.com'
        }

        jwt.sign(payload, secret, options, (err, token) => {
            if (err) reject(err.message);
            resolve(token);
        })
    })    
}

export const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) reject(err.message);
            resolve(payload.aud);
        })
    })
}