import express from "express";
import { authAccessToken } from "../middlewares/auth-middlewares.js";
import { authComment } from "../middlewares/comment-middlewares.js";
import CommentController from "../controllers/comment-controller.js";

const commentRoute = express.Router();
const specificCommentRoute = express.Router();

commentRoute.use("/:id", authComment, specificCommentRoute);

specificCommentRoute.get("/", CommentController.getComment);
specificCommentRoute.post(
	"/react",
	authAccessToken,
	CommentController.reactComment
);
specificCommentRoute.post(
	"/unreact",
	authAccessToken,
	CommentController.unreactComment
);
specificCommentRoute.post(
	"/response",
	authAccessToken,
	CommentController.respondComment
);

export default commentRoute;
