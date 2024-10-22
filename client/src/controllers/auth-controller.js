import axios from "axios";

class AuthController {
	static baseUrl = "http://localhost:8081/auth";

	static async login(usernameOrEmail, password) {
		return new Promise((resolve, reject) => {
			axios
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
			axios
				.post(new URL("/register", this.baseUrl).href, {
					username: username,
					email: email,
					password: password,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					const message = error.response.data.message;

					reject(message);
				});
		});
	}

	static async refresh(refreshToken) {
		return new Promise((resolve, reject) => {
			axios
				.post(new URL("/refresh", baseUrl).href, {
					refreshToken: refreshToken,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					const message = error.response.data.message;

					reject(message);
				});
		});
	}
}

export default AuthController;
