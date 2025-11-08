import { useState, useEffect, useCallback } from "react";
import UserService from "services/user-service";

const useUser = (idUser) => {
	const [user, setUser] = useState(null);
	const [userLoaded, setUserLoaded] = useState(false);

	const fetchUser = useCallback(() => {
		if (idUser) {
			UserService.getUser(idUser).then((response) => {
				setUser(response);
				setUserLoaded(true);
			});
		} else {
			setUser(null);
			setUserLoaded(false);
		}
	}, [idUser]);

	const updateUser = (user) => {
		setUser(user);
		setUserLoaded(true);
	};

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return { user, userLoaded, fetchUser, updateUser };
};

export default useUser;
