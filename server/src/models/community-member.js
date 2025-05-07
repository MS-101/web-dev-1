import { DataTypes } from "sequelize";
import dbConnection from "../config/database.js";
import Community from "./community.js";
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
