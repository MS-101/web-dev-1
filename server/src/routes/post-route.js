import express from "express";
import PostController from "../controllers/post-controller.js";

const postRoute = express.Router();

postRoute.get("/", PostController.getPosts);

export default postRoute;
