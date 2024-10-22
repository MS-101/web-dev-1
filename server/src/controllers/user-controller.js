import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import User from "../models/user.js";
import Community from "../models/community.js";
import CommunityMember from "../models/community_member.js";
import Post from "../models/post.js";

class UserController {
	static async getUsers(req, res) {
		const { query, lastId } = req.query;
		const limit = 20;

		try {
			const users = await User.findAll({
				where: {
					...(query ? { username: { [Op.iLike]: `%${query}%` } } : {}),
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				order: [["id", "ASC"]],
				limit: limit + 1,
			});

			let lastPage = true;
			if (users.count() > limit) {
				users.pop();
				lastPage = false;
			}

			return res.status(StatusCodes.OK).json({
				records: users,
				lastPage: lastPage,
			});
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
			const communities = await Community.findAll({
				include: {
					model: CommunityMember,
					require: true,
					where: {
						id_user: user.id,
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
			const posts = await Post.findAll({
				where: {
					id_user: user.id,
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				order: [["id", "DESC"]],
				limit: limit,
			});

			let lastPage = true;
			if (posts.count() > limit) {
				posts.pop();
				lastPage = false;
			}

			return res.status(StatusCodes.OK).json({
				records: posts,
				lastPage: lastPage,
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch user posts.",
			});
		}
	}
}

export default UserController;
