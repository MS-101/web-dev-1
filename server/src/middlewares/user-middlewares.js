import User from "../models/user.js";

export const authUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({
        id: id,
    });

    if (user) {
        req.user = user;

        next();
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "User does not exist!",
        });
    }
};
