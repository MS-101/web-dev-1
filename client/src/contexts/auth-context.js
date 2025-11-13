import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import AuthService from "services/auth-service";

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const userKey = "banter-user";
	const accessTokenKey = "banter-accessToken";
	const refreshTokenKey = "banter-refreshToken";

	const [authUser, setAuthUser] = useState(
		JSON.parse(localStorage.getItem(userKey))
	);
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem(accessTokenKey)
	);
	const [refreshToken, setRefreshToken] = useState(
		localStorage.getItem(refreshTokenKey)
	);

	const isTokenValid = (token) => {
		if (!token) return false;

		const decodedToken = jwtDecode(token);
		const expiredTime = decodedToken.exp;
		const currentTime = Date.now() / 1000;

		return expiredTime >= currentTime - 10;
	};

	const getAccessToken = async () => {
		return new Promise((resolve, reject) => {
			if (isTokenValid(accessToken)) {
				resolve(accessToken);
			} else {
				AuthService.refresh(refreshToken).then((response) => {
					setAuthentication(response);

					resolve(response.accessToken);
				});
			}
		});
	};

	const setAuthentication = (data) => {
		const user = data.user;
		const accessToken = data.accessToken;
		const refreshToken = data.refreshToken;

		setAuthUser(user);
		setAccessToken(accessToken);
		setRefreshToken(refreshToken);

		localStorage.setItem(userKey, JSON.stringify(user));
		localStorage.setItem(accessTokenKey, accessToken);
		localStorage.setItem(refreshTokenKey, refreshToken);
	};

	const clearAuthentication = () => {
		setAuthUser(null);
		setAccessToken(null);
		setRefreshToken(null);

		localStorage.removeItem(userKey);
		localStorage.removeItem(accessTokenKey);
		localStorage.removeItem(refreshTokenKey);
	};

	return (
		<AuthContext.Provider
			value={{
				setAuthentication,
				clearAuthentication,
				authUser,
				getAccessToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
