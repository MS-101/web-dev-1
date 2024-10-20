import { StatusCodes } from "http-status-codes"
import { Op } from "sequelize"
import User from "../models/user.js"
import Community from "../models/community.js"
import CommunityMember from "../models/community_member.js"
import Post from "../models/post.js"

class UserController {
    static async getUsers(req, res) {
        const { query } = req.query
    
        const filter = query
            ? {
                where: {
                    username: { [Op.iLike]: '%${query}%' }
                }
            }
            : {}
    
        try {
            const users = await User.findAll(filter)
    
            return res.status(StatusCodes.OK).json(users)
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch users.'
            })
        }
    }

    static async getUser(req, res) {
        const { user } = req.body

        return res.status(StatusCodes.OK).json(user)
    }

    static async getUserCommunitites(req, res) {
        const { user } = req.body

        try {
            const communities = await Community.findAll({
                include: {
                    model: CommunityMember,
                    require: true,
                    where: {
                        id_user: user.id
                    }
                }
            })

            return res.status(StatusCodes.OK).json(communities)
        } catch (error) {
            console.log(error)

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch user communitites.'
            })
        }
    }

    static async getUserPosts(req, res) {
        const { user } = req.body
        limit = 20

        try {
            const posts = await Post.findAll({
                where: {
                    id_user: user.id,
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
                message: 'Failed to fetch user posts.'
            })
        }
    }
}

export default UserController