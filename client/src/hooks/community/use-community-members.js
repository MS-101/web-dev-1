import { useState, useEffect, useCallback } from "react";
import CommunityService from "services/community-service";
import "styles/components/community/community-members.css";

const useCommunityMembers = (idCommunity) => {
	const [members, setMembers] = useState([]);
	const [lastMemberId, setLastMemberId] = useState(null);
	const [membersLoaded, setMembersLoaded] = useState(false);

	const fetchMembers = useCallback(() => {
		if (idCommunity) {
			CommunityService.getCommunityMembers(idCommunity).then((response) => {
				setMembers(response);
			});
		} else {
			setMembers([]);
		}

		setMembersLoaded(true);
	}, [idCommunity]);

	useEffect(() => {
		fetchMembers();
	}, [fetchMembers]);

	return { members, membersLoaded, fetchMembers };
};

export default useCommunityMembers;
