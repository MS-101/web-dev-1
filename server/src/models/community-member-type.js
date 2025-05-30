import { DataTypes } from "sequelize";
import dbConnection from "../config/database.js";

export const CommunityMemberTypeEnum = {
	MEMBER: 1,
	MODERATOR: 2,
	ADMIN: 3,
};

const CommunityMemberType = dbConnection.define(
	"communityMemberType",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "community_member_type",
		timestamps: false,
	}
);

export default CommunityMemberType;
