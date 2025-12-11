import { React, useRef } from "react";
import useCommunityMembers from "hooks/community/use-community-members";
import User from "components/user/user";

const CommunityMembers = ({ community }) => {
	const { members, membersLoading, fetchNextMembers } = useCommunityMembers(
		community.id
	);

	const onMembersScroll = () => {
		if (membersLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextMembers();
		}
	};

	const feedRef = useRef(null);

	return (
		<div className="community-members" onScroll={onMembersScroll} ref={feedRef}>
			{members && members.map((element) => <User user={element.user} />)}
		</div>
	);
};

export default CommunityMembers;
