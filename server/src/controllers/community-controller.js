import Community from "../models/community.js";
import CommunityMember, {
	CommunityMemberTypes,
} from "../models/community-member.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";

class CommunityController {
	static async getCommunities(req, res) {
		const { query, lastId } = req.query;
		const limit = 20;

		try {
			const communities = await Community.findAll({
				where: {
					...(query
						? {
								[Op.or]: [
									{ name: { [Op.iLike]: `%${query}%` } },
									{ description: { [Op.iLike]: `%${query}%` } },
								],
						  }
						: {}),
					...(lastId ? { id: { [Op.lt]: lastId } } : {}),
				},
				order: [["id", "ASC"]],
				limit: limit,
			});

			return res.status(StatusCodes.OK).json(communities);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch communities.",
			});
		}
	}

	static async postCommunity(req, res) {
		const { authUser, name, description } = req.body;

		try {
			const communityWithName = await Community.findOne({
				name: name,
			});

			if (communityWithName != null)
				return res.status(StatusCodes.CONFLICT).json({
					message: "Name is occupied!",
				});

			const community = await Community.create({
				created_by: authUser.id,
				name: name,
				description: description,
			});

			const communityMember = await CommunityMember.create({
				id_user: authUser.id,
				id_community: community.id,
				id_community_member_type: CommunityMemberTypes.ADMIN,
			});

			return res.status(StatusCodes.CREATED).json({
				message: "Successfully created community!",
				community: {
					id: community.id,
					name: community.name,
					description: community.description,
				},
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to create community.",
			});
		}
	}

	static async getCommunity(req, res) {
		const { community } = req.body;

		return res.status(201).json(community);
	}

	static async putCommunity(req, res) {
		const { community, name, description } = req.body;

		const updates = {};
		if (name !== undefined) updates.name = name;
		if (description !== undefined) updates.description = description;

		try {
			const updatedCommunity = await community.update(updates);

			return res.status(StatusCodes.OK).json({
				message: "Successfully updated community!",
				community: updatedCommunity,
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to update community.",
			});
		}
	}

	static async joinCommunity(req, res) {
		const { authUser, community } = req.body;

		try {
			await CommunityMember.create({
				id_community: community.id,
				id_user: authUser.id,
			});

			return res.status(StatusCodes.OK).json({
				message: "Successfully join community!",
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to join community.",
			});
		}
	}

	static async leaveCommunity(req, res) {
		const { communityMember } = req.body;

		try {
			communityMember.destroy();

			return res.status(StatusCodes.OK).json({
				message: "Successfully left community!",
			});
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to leave community.",
			});
		}
	}

	static async getCommunityPosts(req, res) {
		const { community } = req.body;
		const { lastId } = req.query;
		const limit = 20;

		try {
			const posts = await Post.findAll({
				where: {
					id_community: community.id,
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
				order: [["id", "DESC"]],
				limit: limit,
			});

			return res.status(StatusCodes.OK).json(posts);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch community posts.",
			});
		}
	}

	static async postCommunityPost(req, res) {
		const { authUser, community, title, body } = req.body;

		try {
			const post = await Post.create({
				createdBy: authUser.id,
				id_community: community.id,
				title: title,
				body: body,
			});

			return res.status(StatusCodes.CREATED).json(post);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to create community post.",
			});
		}
	}

	static async getCommunityMembers(req, res) {
		const { community } = req.body;
		const { lastId } = req.query;
		const limit = 20;

		try {
			const users = await User.findAll({
				include: {
					model: CommunityMember,
					required: true,
					where: {
						id_community: community.id,
						...(lastId ? { id: { [Op.lt]: lastId } } : {}),
					},
					attributes: ["id_community_member_type"],
				},
				order: [["id", "DESC"]],
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
				message: "Failed to fetch community members.",
			});
		}
	}

	static async getCommunityModerators(req, res) {
		const { community } = req.body;

		try {
			const users = await User.findAll({
				include: {
					model: CommunityMember,
					required: true,
					where: {
						id_community: community.id,
						[Op.or]: [
							{
								id_community_member_type: CommunityMemberTypes.MODERATOR,
							},
							{
								id_community_member_type: CommunityMemberTypes.ADMIN,
							},
						],
					},
					attributes: ["id_community_member_type"],
				},
				order: [
					["id_community_member_type", "DESC"],
					["username", "ASC"],
				],
			});

			return res.status(StatusCodes.OK).json(users);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch community moderators.",
			});
		}
	}
}

export default CommunityController;
