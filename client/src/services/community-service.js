import { publicAxios, authAxios } from "config/axios";

class CommunityService {
	static baseUrl = "/community";

	static async getCommunities(query, lastId) {
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

	static async postCommunity(accessToken, name, description) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(this.baseUrl, {
					name: name,
					description: description,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async getCommunity(idCommunity) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idCommunity}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async putCommunity(accessToken, idCommunity, name, description) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.put(`${this.baseUrl}/${idCommunity}`, {
					name: name,
					description: description,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async joinCommunity(accessToken, idCommunity) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idCommunity}/join`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async leaveCommunity(accessToken, idCommunity) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idCommunity}/leave`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async getCommunityPosts(idCommunity, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idCommunity}/post`, {
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

	static async postCommunityPost(accessToken, idCommunity, title, body) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idCommunity}/post`, {
					title: title,
					body: body,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async getCommunityMembers(idCommunity, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idCommunity}/members`, {
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

	static async getCommunityModerators(idCommunity) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idCommunity}/moderators`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}
}

export default CommunityService;
