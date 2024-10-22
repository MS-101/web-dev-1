import { publicAxios } from "config/axios";

class AuthService {
	static baseUrl = "/auth";

	static async login(usernameOrEmail, password) {
		return new Promise((resolve, reject) => {
			publicAxios
				.post(new URL("/login", this.baseUrl).href, {
					usernameOrEmail: usernameOrEmail,
					password: password,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async register(username, email, password) {
		return new Promise((resolve, reject) => {
			publicAxios
				.post(new URL("/register", this.baseUrl).href, {
					username: username,
					email: email,
					password: password,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async refresh(refreshToken) {
		return new Promise((resolve, reject) => {
			publicAxios
				.post(new URL("/refresh", baseUrl).href, {
					refreshToken: refreshToken,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}
}

export default AuthService;
