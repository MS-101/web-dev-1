import Community from "../models/community.js";
import CommunityMember from "../models/community-member.js";
import CommunityMemberType, {
	CommunityMemberTypeEnum,
} from "../models/community-member-type.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import { StatusCodes } from "http-status-codes";
import { Op, Sequelize } from "sequelize";

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
									{ name: { [Op.like]: `%${query}%` } },
									{ description: { [Op.like]: `%${query}%` } },
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
				where: {
					name: name,
				},
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
				id_community_member_type: CommunityMemberTypeEnum.ADMIN,
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

		return res.status(StatusCodes.OK).json(community);
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
				id_community_member_type: CommunityMemberTypeEnum.MEMBER,
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
		const { query, community } = req.body;
		const { lastId } = req.query;
		const limit = 20;

		try {
			const posts = await Post.findAll({
				where: {
					id_community: community.id,
					...(query
						? {
								[Op.or]: [
									{ title: { [Op.like]: `%${query}%` } },
									{ body: { [Op.like]: `%${query}%` } },
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
				attributes: ["id", "username"],
				include: [
					{
						model: Community,
						attributes: [],
						required: true,
						through: {
							model: CommunityMember,
							attributes: ["id_community_member_type"],
						},
						where: {
							id: community.id,
							...(lastId ? { id: { [Op.lt]: lastId } } : {}),
						},
					},
				],
				order: [["username", "ASC"]],
				limit: limit + 1,
			});

			let lastPage = true;
			if (users.length > limit) {
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
				attributes: ["id", "username"],
				include: {
					model: Community,
					required: true,
					through: {
						model: CommunityMember,
						include: {
							model: CommunityMemberType,
							required: true,
							where: {
								[Op.or]: [
									{ id: CommunityMemberTypeEnum.MODERATOR },
									{ id: CommunityMemberTypeEnum.ADMIN },
								],
							},
						},
					},
					where: { id: community.id },
				},
				order: [["username", "ASC"]],
			});

			const formattedUsers = users.map((user) => {
				const communityMember = user.communities[0].communityMember;
				return {
					id: user.id,
					username: user.username,
					id_community_member_type: communityMember.id_community_member_type,
					community_member_type: communityMember.name,
				};
			});

			return res.status(StatusCodes.OK).json(formattedUsers);
		} catch (error) {
			console.log(error);

			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Failed to fetch community moderators.",
			});
		}
	}
}

export default CommunityController;
