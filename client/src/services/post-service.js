import { authAxios, publicAxios } from "config/axios";

class PostService {
	static baseUrl = "/post";

	static async getPosts(query, lastId) {
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

	static async getPost(idPost) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idPost}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async putPost(accessToken, idPost) {
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
					reject(error.response.data.message);
				});
		});
	}

	static async likePost(accessToken, idPost) {
		return this.postReaction(accessToken, idPost, true);
	}

	static async dislikePost(accessToken, idPost) {
		return this.postReaction(accessToken, idPost, false);
	}

	static async postReaction(accessToken, idPost, isPositive) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idPost}/reaction`, {
					is_positive: isPositive,
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async deleteReaction(accessToken, idPost) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.delete(`${this.baseUrl}/${idPost}/reaction`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async getComments(idComment, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idComment}/comment`, {
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

	static async postComment(accessToken, idPost, text) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idPost}/comment`, {
					text: text,
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

export default PostService;
