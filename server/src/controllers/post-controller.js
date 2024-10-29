import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import Post from "../models/post.js";

class PostController {
	static async getPosts(req, res) {
		const { query, lastId } = req.query;
		const limit = 20;

		try {
			const posts = await Post.findAll({
				where: {
					...(query
						? {
								[Op.or]: [
									{ title: { [Op.iLike]: `%${query}%` } },
									{ body: { [Op.iLike]: `%${query}%` } },
								],
						  }
						: {}),
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				order: [["id", "ASC"]],
				limit: limit,
			});

			return res.status(StatusCodes.OK).json(posts);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch posts.",
			});
		}
	}
}

export default PostController;
