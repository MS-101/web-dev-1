import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";

export const authUser = async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({
		where: {
			id: id,
		},
	});

	if (user) {
		req.body.user = user;

		next();
	} else {
		return res.status(StatusCodes.NOT_FOUND).json({
			message: "User does not exist!",
		});
	}
};
