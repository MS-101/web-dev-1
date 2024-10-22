import { publicAxios } from "config/axios";

class UserService {
	static baseUrl = "/user";

	static async getUsers(query, lastId) {
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
					reject(error.response.data.message);
				});
		});
	}

	static async getUser(idUser) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(new URL(`/${idUser}`, this.baseUrl).href)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async getUserCommunities(idUser) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(new URL(`/${idUser}/community`, this.baseUrl).href)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async getUserPosts(idUser, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(new URL(`/${idUser}/post`, this.baseUrl).href, {
					params: {
						lastId: lastId,
					},
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

export default UserService;
