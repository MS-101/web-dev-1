import React, { createContext, useState, useContext } from "react";
import useUserCommunities from "hooks/use-user-communities";
import { useAuthContext } from "contexts/auth-context";

export const NavigationContext = createContext();

export const useNavigationContext = () => {
	return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
	const { user } = useAuthContext();

	const {
		communities: naviCommunities,
		communitiesLoaded: naviCommunitiesLoaded,
		fetchCommunities: fetchNaviCommunities,
		updateCommunity: updateNaviCommunity,
	} = useUserCommunities(user?.id);

	return (
		<NavigationContext.Provider
			value={{
				naviCommunities,
				naviCommunitiesLoaded,
				fetchNaviCommunities,
				updateNaviCommunity,
			}}
		>
			{children}
		</NavigationContext.Provider>
	);
};
