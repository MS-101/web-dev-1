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
}

export default PostService;
