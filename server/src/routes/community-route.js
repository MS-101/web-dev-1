import express from 'express';
import { getCommunities, postCommunity, putCommunity, getSubscribedCommunities } from '../controllers/community-controller.js';
import { authModerator, authUser } from '../middlewares/authorization.js';

const communityRoute = express.Router();

communityRoute.get('/', getCommunities);
communityRoute.post('/', authUser, postCommunity);
communityRoute.put('/:id', authUser, authModerator, putCommunity);
communityRoute.get('/subscribed', authUser, getSubscribedCommunities);

export default communityRoute