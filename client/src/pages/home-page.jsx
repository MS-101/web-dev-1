import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "contexts/auth-context";

const HomePage = () => {
	const { authUser } = useAuthContext();

	return authUser ? (
		<Navigate to="/feed" replace />
	) : (
		<Navigate to="/trending" replace />
	);
};

export default HomePage;
