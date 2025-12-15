import { publicAxios, authAxios } from "config/axios";

class CommentService {
	static baseUrl = "/comment";

	static async getComments(query, lastId, accessToken = null) {
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

	static async getComment(idComment) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idComment}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async putComment(accessToken, idComment, text) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.put(`${this.baseUrl}/${idComment}`, {
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

	static async likeComment(accessToken, idComment) {
		return this.postCommentReaction(accessToken, idComment, true);
	}

	static async dislikeComment(accessToken, idComment) {
		return this.postCommentReaction(accessToken, idComment, false);
	}

	static async postCommentReaction(accessToken, idComment, isPositive) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idComment}/reaction`, {
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

	static async deleteCommentReaction(accessToken, idComment) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.delete(`${this.baseUrl}/${idComment}/reaction`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.message);
				});
		});
	}

	static async getCommentResponses(idComment, lastId) {
		return new Promise((resolve, reject) => {
			publicAxios
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

	static async postCommentResponse(accessToken, idComment, text) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idComment}/response`, {
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

export default CommentService;
