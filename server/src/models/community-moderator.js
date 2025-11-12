import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../config/database.js";
import Community from "./community.js";
import User from "./user.js";

const CommunityModerator = dbConnection.define(
	"communityModerator",
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
	},
	{
		tableName: "community_moderator",
		timestamps: false,
	}
);

Community.addScope("moderatorsCount", {
	subQuery: false,
	attributes: [
		[
			Sequelize.literal(
				"( SELECT COUNT(*) FROM community_moderator WHERE community_moderator.id_community = community.id )"
			),
			"moderatorsCount",
		],
	],
});

Community.addScope("isModerator", (id_user) => ({
	subQuery: false,
	attributes: [
		[
			Sequelize.literal(
				`( SELECT COUNT(*) FROM community_moderator WHERE id_community = community.id AND id_user = ${id_user} ) > 0`
			),
			"isModerator",
		],
	],
}));

User.belongsToMany(Community, {
	through: CommunityModerator,
	as: "moderatedCommunities",
	foreignKey: "id_user",
});
Community.belongsToMany(User, {
	through: CommunityModerator,
	foreignKey: "id_community",
});

CommunityModerator.belongsTo(Community, {
	foreignKey: "id_community",
});
Community.hasMany(CommunityModerator, {
	foreignKey: "id_community",
});

CommunityModerator.belongsTo(User, {
	foreignKey: "id_user",
});
User.hasMany(CommunityModerator, {
	foreignKey: "id",
});

export default CommunityModerator;
