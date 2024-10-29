import { publicAxios, authAxios } from "config/axios";

class AuthService {
	static baseUrl = "/auth";

	static async register(username, email, password) {
		return new Promise((resolve, reject) => {
			publicAxios
				.post(`${this.baseUrl}/register`, {
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

	static async login(usernameOrEmail, password) {
		return new Promise((resolve, reject) => {
			publicAxios
				.post(`${this.baseUrl}/login`, {
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

	static async refresh(refreshToken) {
		return new Promise((resolve, reject) => {
			authAxios(refreshToken)
				.post(`${this.baseUrl}/refresh`)
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
