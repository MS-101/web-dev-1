import express from "express";
import { authAccessToken } from "../middlewares/auth-middlewares.js";
import { authPost } from "../middlewares/post-middlewares.js";
import PostController from "../controllers/post-controller.js";

const postRoute = express.Router();
const specificPostRoute = express.Router();

postRoute.get("/", PostController.getPosts);
postRoute.use("/:id", authPost, specificPostRoute);

specificPostRoute.get("/", PostController.getPost);
specificPostRoute.post("/react", authAccessToken, PostController.reactPost);
specificPostRoute.post("/unreact", authAccessToken, PostController.unreactPost);
specificPostRoute.post("/comment", authAccessToken, PostController.commentPost);

export default postRoute;
