import { authAxios, publicAxios } from "config/axios";

class PostService {
	static baseUrl = "/post";

	static async getPosts(query, lastId, accessToken = null) {
		return new Promise((resolve, reject) => {
			const axios = accessToken ? authAxios(accessToken) : publicAxios;

			axios
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

	static async getPost(idPost, accessToken = null) {
		return new Promise((resolve, reject) => {
			const axios = accessToken ? authAxios(accessToken) : publicAxios;

			axios
				.get(`${this.baseUrl}/${idPost}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async putPost(accessToken, idPost, title, body) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.put(`${this.baseUrl}/${idPost}`, {
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

	static async likePost(accessToken, idPost) {
		return this.postPostReaction(accessToken, idPost, true);
	}

	static async dislikePost(accessToken, idPost) {
		return this.postPostReaction(accessToken, idPost, false);
	}

	static async postPostReaction(accessToken, idPost, isPositive) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idPost}/reaction`, {
					is_positive: isPositive,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async deletePostReaction(accessToken, idPost) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.delete(`${this.baseUrl}/${idPost}/reaction`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async getPostResponses(idComment, lastId = null, accessToken = null) {
		return new Promise((resolve, reject) => {
			const axios = accessToken ? authAxios(accessToken) : publicAxios;

			axios
				.get(`${this.baseUrl}/${idComment}/response`, {
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

	static async postPostResponse(accessToken, idPost, text) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idPost}/response`, {
					text: text,
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

export default PostService;
