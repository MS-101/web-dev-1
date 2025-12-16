import { useState, useEffect, useCallback } from "react";
import UserService from "services/user-service";

const useQueryUsers = (query) => {
	const [users, setUsers] = useState([]);
	const [lastUserId, setLastUserId] = useState(null);
	const [usersLoading, setUsersLoading] = useState(false);

	const fetchTopUsers = useCallback(() => {
		setUsersLoading(true);

		UserService.getUsers(query).then((curUsers) => {
			const lastUser = curUsers[curUsers.length - 1];

			setUsers(curUsers);
			setLastUserId(lastUser?.id);
			setUsersLoading(false);
		});
	}, [query]);

	useEffect(() => {
		fetchTopUsers();
	}, [fetchTopUsers]);

	const fetchNextUsers = useCallback(() => {
		if (lastUserId) {
			setUsersLoading(true);

			UserService.getUsers(query, lastUserId).then((curUsers) => {
				const lastUser = curUsers[curUsers.length - 1];

				setUsers(users.concat(curUsers));
				setLastUserId(lastUser?.id);
				setUsersLoading(false);
			});
		}
	}, [query, users, lastUserId]);

	return {
		users,
		usersLoading,
		fetchTopUsers,
		fetchNextUsers,
	};
};

export default useQueryUsers;
