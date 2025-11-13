import { authAxios, publicAxios } from "config/axios";

class UserService {
	static baseUrl = "/user";

	static async getUsers(query = null, lastId = null) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(this.baseUrl, {
					params: {
						query: query,
						lastId: lastId,
					},
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async getUser(idUser) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idUser}/`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async getUserCommunities(idUser, accessToken = null) {
		return new Promise((resolve, reject) => {
			const axios = accessToken ? authAxios(accessToken) : publicAxios;

			axios
				.get(`${this.baseUrl}/${idUser}/community/`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async getUserPosts(idUser, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idUser}/post/`, {
					params: {
						lastId: lastId,
					},
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}
}

export default UserService;
