import { DataTypes } from "sequelize";
import dbConnection from "../config/database.js";
import Community from "./community.js";
import User from "./user.js";

export const CommunityMemberTypes = {
    MEMBER: 1,
    MODERATOR: 2,
    ADMIN: 3,
};

const CommunityMember = dbConnection.define(
    "communityMember",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        id_community: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Community,
                key: "id",
            },
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        tableName: "community_member",
        timestamps: false,
    }
);

User.belongsToMany(Community, {
    through: CommunityMember,
    foreignKey: "id_user",
});
Community.belongsToMany(User, {
    through: CommunityMember,
    foreignKey: "id_community",
});

export default CommunityMember;
