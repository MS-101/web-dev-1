import Community from '../models/community.js'
import CommunityMember, { CommunityMemberTypes } from '../models/community_member.js'
import User from '../models/user.js'
import Post from '../models/post.js'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'

class CommunityController {
    static async getCommunities(req, res) {
        const { query } = req.query
    
        const filter = query
            ? {
                where: {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${query}%` } },
                        { description: { [Op.iLike]: `%${query}%` } }
                    ]
                }
            }
            : {}
    
        try {
            const communities = await Community.findAll(filter);
    
            return res.status(StatusCodes.OK).json(communities);
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch communities.'
            })
        }
    }

    static async postCommunity(req, res) {
        const { user, name, description } = req.body
    
        try {
            const communityWithName = await Community.findOne({
                name: name
            });

            if (communityWithName != null)
                return res.status(StatusCodes.CONFLICT).json({
                    message: 'Name is occupied!'
                });
        
            const community = await Community.create({
                createdBy: user.id,
                name: name,
                description: description
            });
        
            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created community!',
                community: community
            });
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to create community.'
            })
        }
    }

    static async getCommunity(req, res) {
        const { community } = req.body
    
        return res.status(201).json(community)
    }

    static async putCommunity(req, res) {
        const { community, name, description } = req.body
    
        const updates = {}
        if (name !== undefined) updates.name = name
        if (description !== undefined) updates.description = description
    
        try {
            const updatedCommunity = await community.update(updates)
        
            return res.status(StatusCodes.OK).json({
                message: 'Successfully updated community!',
                community: updatedCommunity
            })
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to update community.'
            })
        }

    }

    static async joinCommunity(req, res) {
        const { community, user } = req.body

        try {
            await CommunityMember.create({
                id_community: community.id,
                id_user: user.id
            })
    
            return res.status(StatusCodes.OK).json({
                message: 'Successfully join community!'
            })
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to join community.'
            })
        }
    }

    static async leaveCommunity(req, res) {
        const { communityMember } = req.body

        try {
            communityMember.destroy()

            return res.status(StatusCodes.OK).json({
                message: 'Successfully left community!'
            })
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to leave community.'
            })
        }
    }

    static async getCommunityPosts(req, res) {
        const { community } = req.body
        const { lastPostId } = req.query
        const limit = 20

        try {
            const posts = await Post.findAll({
                where: {
                    id_community: community.id,
                    ...(lastPostId ? { id: { [Op.lt]: lastPostId } } : {})
                },
                order: [
                    ['created_date', 'DESC']
                ],
                limit: limit
            })

            return res.status(StatusCodes.OK).json(posts)
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch community posts.'
            })
        }
    }
    
    static async postCommunityPost(req, res) {
        const { user, community, title, body } = req.body

        try {
            const post = await Post.create({
                createdBy: user.id,
                id_community: community.id,
                title: title,
                body: body
            })

            return res.status(StatusCodes.CREATED).json(post)
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to create community post.'
            })
        }
    }
    
    static async getCommunityMembers(req, res) {
        const { community } = req.body

        try {
            const users = await User.findAll({
                include: {
                    model: CommunityMember,
                    required: true,
                    where: {
                        id_community: community.id_community
                    },
                    attributes: ['id_community_member_type']
                }
            })

            return res.status(StatusCodes.OK).json(users)
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch community members.'
            })
        }
    }
    
    static async getCommunityModerators(req, res) {
        const { community } = req.body

        try {
            const users = await User.findAll({
                include: {
                    model: CommunityMember,
                    required: true,
                    where: {
                        id_community: community.id_community,
                        [Op.or] : [
                            {id_community_member_type: CommunityMemberTypes.MODERATOR},
                            {id_community_member_type: CommunityMemberTypes.ADMIN}
                        ]
                    },
                    attributes: ['id_community_member_type']
                }
            })

            return res.status(StatusCodes.OK).json(users)
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch community moderators.'
            })
        }
    }
}

export default CommunityController;