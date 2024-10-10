import { verifyAccessToken } from '../helpers/jwt-helpers.js'
import { isCommunityModerator } from '../services/community-service.js';

export const authUser = async (req, res, next) => {
    const accessToken = req.headers['accessToken'];

    if (!accessToken) {
        return res.status(401).json({
            message: 'Access token missing!'
        });
    }

    verifyAccessToken(accessToken)
    .then((user) => {
        req.user = user

        next()
    })
    .catch((error) => {
        console.log(error)

        return res.status(401).json({
            message: 'Invalid access token!'
        });
    })
}

export const authModerator = (req, res, next) => {
    const communityId = req.params.id;
    const userId = req.user.id;

    const isModerator = isCommunityModerator(communityId, userId);

    if (!isModerator) {
        return res.status(403).json({
            message: 'You are not a moderator of this community!'
        });
    }

    next();
}