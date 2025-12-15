import { React, useRef } from "react";
import useQueryUsers from "hooks/user/use-query-users";
import User from "./user";
import "styles/components/user/query-users.css";

const QueryUsers = ({ query }) => {
	const { users, usersLoading, fetchNextUsers } = useQueryUsers(query);

	const onUsersScroll = () => {
		if (usersLoading) return;

		const feed = feedRef.current;
		const threshold = 10;

		if (feed.scrollTop + feed.clientHeight >= feed.scrollHeight - threshold) {
			fetchNextUsers();
		}
	};

	const feedRef = useRef(null);

	return (
		<div className="query-users" onScroll={onUsersScroll} ref={feedRef}>
			{users && users.length === 0 && <p>No users found.</p>}
			{users &&
				users.map((element, index) => <User index={index} user={element} />)}
			{usersLoading && <p>Loading...</p>}
		</div>
	);
};

export default QueryUsers;
