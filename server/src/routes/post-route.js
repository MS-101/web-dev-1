import express from "express";
import { authAccessToken } from "../middlewares/auth-middlewares.js";
import { authPost } from "../middlewares/post-middlewares.js";
import PostController from "../controllers/post-controller.js";

const postRoute = express.Router();
const specificPostRoute = express.Router();

postRoute.get("/", PostController.getPosts);
postRoute.use("/:id", authPost, specificPostRoute);

specificPostRoute.get("/", PostController.getPost);
specificPostRoute.put("/", authAccessToken, PostController.putPost);
specificPostRoute.post(
	"/reaction",
	authAccessToken,
	PostController.postReaction
);
specificPostRoute.delete(
	"/reaction",
	authAccessToken,
	PostController.deleteReaction
);
specificPostRoute.get("/comment", PostController.getComments);
specificPostRoute.post("/comment", authAccessToken, PostController.postComment);

export default postRoute;
