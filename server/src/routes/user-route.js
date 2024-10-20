import express from "express";
import UserController from "../controllers/user-controller.js";
import { authUser } from "../middlewares/user-middlewares.js";

const userRoute = express.Router();
const specificUserRoute = express.Router();

userRoute.get("/", UserController.getUsers);
userRoute.get("/:id", authUser, specificUserRoute);

specificUserRoute.get("/", UserController.getUser);
specificUserRoute.get("/community", UserController.getUserCommunitites);
specificUserRoute.get("/post", UserController.getUserPosts);

export default userRoute;
