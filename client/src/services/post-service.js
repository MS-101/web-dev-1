import { publicAxios } from "config/axios";

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

	static async likePost(accessToken, idPost) {
		return this.reactPost(accessToken, idPost, true);
	}

	static async dislikePost(accessToken, idPost) {
		return this.reactPost(accessToken, idPost, false);
	}

	static async reactPost(accessToken, idPost, isPositive) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idPost}/react`, {
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

	static async unreactPost(accessToken, idPost) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idPost}/unreact`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async commentPost(accessToken, idPost, text) {
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
