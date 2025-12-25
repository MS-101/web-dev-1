import { React, useRef } from "react";
import useQueryCommunities from "hooks/community/use-query-communities";
import Community from "./community";
import "styles/components/community/query-communities.scss";

const QueryCommunities = ({ query }) => {
	const { communities, communitiesLoading, fetchNextCommunities } =
		useQueryCommunities(query);

	const onCommunitiesScroll = () => {
		if (communitiesLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextCommunities();
		}
	};

	const feedRef = useRef(null);

	return (
		<div
			className="query-communities"
			onScroll={onCommunitiesScroll}
			ref={feedRef}
		>
			{communities && communities.length === 0 && <p>No communities found.</p>}
			{communities &&
				communities.map((element, index) => (
					<Community index={index} community={element} />
				))}
			{communitiesLoading && <p>Loading...</p>}
		</div>
	);
};

export default QueryCommunities;
