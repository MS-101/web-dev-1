import { publicAxios, authAxios } from "config/axios";

class CommentService {
	static baseUrl = "/comment";

	static async getComment(idComment) {
		return new Promise((resolve, reject) => {
			publicAxios
				.get(`${this.baseUrl}/${idComment}`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async likeComment(accessToken, idComment) {
		return this.reactComment(accessToken, idComment, true);
	}

	static async dislikeComment(accessToken, idComment) {
		return this.reactComment(accessToken, idComment, false);
	}

	static async reactComment(accessToken, idComment, isPositive) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idComment}/react`, {
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

	static async unreactComment(accessToken, idComment) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idComment}/unreact`)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response.data.message);
				});
		});
	}

	static async respondComment(accessToken, idComment, text) {
		return new Promise((resolve, reject) => {
			authAxios(accessToken)
				.post(`${this.baseUrl}/${idComment}/response`, {
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

export default CommentService;
