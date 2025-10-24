import jwt from "jsonwebtoken";

export const extractToken = (headers) => {
	const authHeader = headers["authorization"];
	if (authHeader && authHeader.startsWith("Bearer ")) {
		const token = authHeader.substring(7, authHeader.length);

		return token;
	}

	return null;
};

export const signAccessToken = (user) => {
	return new Promise((resolve, reject) => {
		const payload = {
			user: user,
		};
		const secret = process.env.ACCESS_TOKEN_SECRET;
		const options = {
			expiresIn: "30s",
			issuer: "banter.com",
		};

		jwt.sign(payload, secret, options, (err, token) => {
			if (err) reject(err.message);
			resolve(token);
		});
	});
};

export const verifyAccessToken = (token) => {
	return new Promise((resolve, reject) => {
		const secret = process.env.ACCESS_TOKEN_SECRET;

		jwt.verify(token, secret, (err, payload) => {
			if (err) reject(err.message);

			resolve(payload.user);
		});
	});
};

export const signRefreshToken = (user) => {
	return new Promise((resolve, reject) => {
		const payload = {
			user: user,
		};
		const secret = process.env.REFRESH_TOKEN_SECRET;
		const options = {
			expiresIn: "1y",
			issuer: "banter.com",
		};

		jwt.sign(payload, secret, options, (err, token) => {
			if (err) reject(err.message);

			resolve(token);
		});
	});
};

export const verifyRefreshToken = (token) => {
	return new Promise((resolve, reject) => {
		const secret = process.env.REFRESH_TOKEN_SECRET;

		jwt.verify(token, secret, (err, payload) => {
			if (err) reject(err.message);

			resolve(payload.user);
		});
	});
};

export const signResetToken = (user) => {
	return new Promise((resolve, reject) => {
		const payload = {
			user: user,
		};
		const secret = process.env.RESET_TOKEN_SECRET;
		const options = {
			expiresIn: "5m",
			issuer: "banter.com",
		};

		jwt.sign(payload, secret, options, (err, token) => {
			if (err) reject(err.message);

			resolve(token);
		});
	});
};

export const verifyResetToken = (token) => {
	return new Promise((resolve, reject) => {
		const secret = process.env.RESET_TOKEN_SECRET;

		jwt.verify(token, secret, (err, payload) => {
			if (err) reject(err.message);

			resolve(payload.user);
		});
	});
};
