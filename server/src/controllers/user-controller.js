import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import User from "../models/user.js";
import Community from "../models/community.js";
import Post from "../models/post.js";

class UserController {
	static async getUsers(req, res) {
		const { query, lastId } = req.query;
		const limit = 20;

		try {
			const users = await User.findAll({
				where: {
					...(query ? { username: { [Op.like]: `%${query}%` } } : {}),
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				order: [["id", "ASC"]],
				limit: limit,
			});

			return res.status(StatusCodes.OK).json(users);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch users.",
			});
		}
	}

	static async getUser(req, res) {
		const { user } = req.body;

		return res.status(StatusCodes.OK).json(user);
	}

	static async getUserCommunitites(req, res) {
		const { user } = req.body;

		try {
			const communities = await Community.scope(
				"defaultScope",
				"membersCount"
			).findAll({
				include: {
					model: User,
					require: true,
					where: {
						id: user.id,
					},
				},
				order: [["name", "ASC"]],
			});

			return res.status(StatusCodes.OK).json(communities);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch user communitites.",
			});
		}
	}

	static async getUserPosts(req, res) {
		const { user } = req.body;
		const { lastId } = req.query;
		const limit = 20;

		try {
			const posts = await Post.scope("defaultScope", "ratings").findAll({
				where: {
					id_user: user.id,
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				order: [["id", "DESC"]],
				limit: limit,
			});

			return res.status(StatusCodes.OK).json(posts);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch user posts.",
			});
		}
	}
}

export default UserController;
