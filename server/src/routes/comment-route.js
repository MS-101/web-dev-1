import express from "express";
import { authAccessToken } from "../middlewares/auth-middlewares.js";
import { authComment } from "../middlewares/comment-middlewares.js";
import CommentController from "../controllers/comment-controller.js";

const commentRoute = express.Router();
const specificCommentRoute = express.Router();

commentRoute.use("/:id", authComment, specificCommentRoute);

specificCommentRoute.get("/", CommentController.getComment);
specificCommentRoute.put("/", authAccessToken, CommentController.putComment);
specificCommentRoute.post(
	"/reaction",
	authAccessToken,
	CommentController.postReaction
);
specificCommentRoute.delete(
	"/reaction",
	authAccessToken,
	CommentController.deleteReaction
);
specificCommentRoute.get("/comment", CommentController.getComments);
specificCommentRoute.post(
	"/comment",
	authAccessToken,
	CommentController.postComment
);

export default commentRoute;
