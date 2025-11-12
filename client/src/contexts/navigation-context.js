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
		addCommunity: addNaviCommunity,
		updateCommunity: updateNaviCommunity,
		removeCommunity: removeNaviCommunity,
	} = useUserCommunities(user?.id);

	return (
		<NavigationContext.Provider
			value={{
				naviCommunities,
				naviCommunitiesLoaded,
				fetchNaviCommunities,
				addNaviCommunity,
				updateNaviCommunity,
				removeNaviCommunity,
			}}
		>
			{children}
		</NavigationContext.Provider>
	);
};
