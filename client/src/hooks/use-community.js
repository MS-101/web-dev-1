import { useState, useEffect } from "react";
import CommunityService from "services/community-service";

const useCommunity = (idCommunity) => {
	const [community, setCommunity] = useState(null);

	useEffect(() => {
		CommunityService.getCommunity(idCommunity).then((response) => {
			setCommunity(response);
		});
	}, [idCommunity]);

	return community;
};

export default useCommunity;
