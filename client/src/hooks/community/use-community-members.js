import { useState, useEffect, useCallback } from "react";
import CommunityService from "services/community-service";

const useCommunityMembers = (idCommunity) => {
	const [members, setMembers] = useState([]);
	const [lastMemberId, setLastMemberId] = useState(null);
	const [membersLoading, setMembersLoading] = useState(false);

	const fetchTopMembers = useCallback(() => {
		if (idCommunity) {
			setMembersLoading(true);

			CommunityService.getCommunityMembers(idCommunity).then((curMembers) => {
				const lastMember = curMembers[curMembers.length - 1];

				setMembers(curMembers);
				setLastMemberId(lastMember?.id);
				setMembersLoading(false);
			});
		} else {
			setMembers([]);
			setLastMemberId(null);
		}
	}, [idCommunity]);

	useEffect(() => {
		fetchTopMembers();
	}, [fetchTopMembers]);

	const fetchNextMembers = useCallback(() => {
		if (lastMemberId) {
			setMembersLoading(true);

			CommunityService.getCommunityMembers(idCommunity, lastMemberId).then(
				(response) => {
					const curMembers = response;
					const lastMember = curMembers[curMembers.length - 1];

					setMembers(members.concat(curMembers));
					setLastMemberId(lastMember?.id);
					setMembersLoading(false);
				}
			);
		}
	}, [idCommunity, members, lastMemberId]);

	return { members, membersLoading, fetchTopMembers, fetchNextMembers };
};

export default useCommunityMembers;
