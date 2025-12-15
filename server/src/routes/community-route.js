import express from "express";
import CommunityController from "../controllers/community-controller.js";
import { authAccessToken } from "../middlewares/auth-middlewares.js";
import {
	authCommunity,
	authNonCommunityMember,
	authCommunityMember,
	authCommunityModerator,
} from "../middlewares/community-middlewares.js";

const communityRoute = express.Router();
const specificCommunityRoute = express.Router();

communityRoute.get("/", CommunityController.getCommunities);
communityRoute.post("/", authAccessToken, CommunityController.postCommunity);
communityRoute.use("/:id", authCommunity, specificCommunityRoute);

specificCommunityRoute.get("/", CommunityController.getCommunity);
specificCommunityRoute.put(
	"/",
	authAccessToken,
	authCommunityModerator,
	CommunityController.putCommunity
);
specificCommunityRoute.post(
	"/join",
	authAccessToken,
	authNonCommunityMember,
	CommunityController.joinCommunity
);
specificCommunityRoute.post(
	"/leave",
	authAccessToken,
	authCommunityMember,
	CommunityController.leaveCommunity
);
specificCommunityRoute.get("/post", CommunityController.getCommunityPosts);
specificCommunityRoute.post("/post", CommunityController.postCommunityPost);
specificCommunityRoute.get("/member", CommunityController.getCommunityMembers);
specificCommunityRoute.get(
	"/moderator",
	CommunityController.getCommunityModerators
);

export default communityRoute;
