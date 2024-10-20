import Community from "../models/community.js";
import CommunityMember from "../models/community_member.js";
import { CommunityMemberTypes } from "../models/community_member.js";
import { StatusCodes } from "http-status-codes";

export const authCommunity = async (req, res) => {
    const { id } = req.params;

    const community = await Community.findOne({
        id: id,
    });

    if (community != null) {
        req.community = community;

        next();
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "Community does not exist!",
        });
    }
};

export const authNonCommunityMember = async (req, res, next) => {
    const { authUser, community } = req.body;

    const communityMember = await CommunityMember.findOne({
        where: {
            id_user: authUser.id,
            id_community: community.id,
        },
    });

    if (!communityMember) {
        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "You are already a member of this community!",
        });
    }
};

export const authCommunityMember = async (req, res, next) => {
    const { authUser, community } = req.body;

    const communityMember = await CommunityMember.findOne({
        where: {
            id_user: authUser.id,
            id_community: community.id,
        },
    });

    if (communityMember) {
        req.communityMember = communityMember;

        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "You are not a member of this community!",
        });
    }
};

export const authCommunityModerator = async (req, res, next) => {
    const { authUser, community } = req.body;

    const communityMember = await CommunityMember.findOne({
        where: {
            id_user: authUser.id,
            id_community: community.id,
            [Op.or]: [
                { id_community_member_type: CommunityMemberTypes.MODERATOR },
                { id_community_member_type: CommunityMemberTypes.ADMIN },
            ],
        },
    });

    if (communityMember) {
        req.communityMember = communityMember;

        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "You are not a moderator of this community!",
        });
    }
};

export const authCommunityAdmin = async (req, res, next) => {
    const { authUser, community } = req.body;

    const communityMember = await CommunityMember.findOne({
        where: {
            id_user: authUser.id,
            id_community: community.id,
            id_community_member_type: CommunityMemberTypes.ADMIN,
        },
    });

    if (communityMember) {
        req.communityMember = communityMember;

        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "You are not an admin of this community!",
        });
    }
};
