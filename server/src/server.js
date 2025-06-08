import express from "express";
import cors from "cors";
import authRoute from "./routes/auth-route.js";
import communityRoute from "./routes/community-route.js";
import userRoute from "./routes/user-route.js";
import postRoute from "./routes/post-route.js";
import commentRoute from "./routes/comment-route.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/community", communityRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

app.listen(8081, () => {
	console.log("Server is listening...");
});
