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
					reject(error.response.data.message);
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
					reject(error.response.data.message);
				});
		});
	}

	static async getCommunity(idCommunity) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(new URL(`/${idCommunity}`, this.baseUrl).href)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async putCommunity(accessToken, idCommunity, name, description) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.put(new URL(`/${idCommunity}`, this.baseUrl).href, {
					name: name,
					description: description,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async joinCommunity(accessToken, idCommunity) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(new URL(`/${idCommunity}/join`, this.baseUrl).href)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async leaveCommunity(accessToken, idCommunity) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(new URL(`/${idCommunity}/leave`, this.baseUrl).href)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async getCommunityPosts(idCommunity, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(new URL(`/${idCommunity}/posts`, this.baseUrl).href, {
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

	static async postCommunityPost(accessToken, idCommunity, title, body) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(new URL(`/${idCommunity}/posts`, this.baseUrl).href, {
					title: title,
					body: body,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async getCommunityMembers(idCommunity, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(new URL(`/${idCommunity}/members`, this.baseUrl).href, {
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

	static async getCommunityModerators(idCommunity, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(new URL(`/${idCommunity}/moderators`, this.baseUrl).href)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}
}

export default CommunityService;
