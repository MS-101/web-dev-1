import { DataTypes } from "sequelize";
import dbConnection from "../config/database.js";
import Community from "./community.js";
import CommunityMemberType from "./community-member-type.js";
import User from "./user.js";

const CommunityMember = dbConnection.define(
	"communityMember",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
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
		id_community_member_type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: CommunityMemberType,
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

CommunityMember.belongsTo(Community, {
	foreignKey: "id_community",
});
Community.hasMany(CommunityMember, {
	foreignKey: "id",
});

CommunityMember.belongsTo(User, {
	foreignKey: "id_user",
});
User.hasMany(CommunityMember, {
	foreignKey: "id",
});

CommunityMember.belongsTo(CommunityMemberType, {
	foreignKey: "id_community_member_type",
});
CommunityMemberType.hasMany(CommunityMember, {
	foreignKey: "id",
});

export default CommunityMember;
