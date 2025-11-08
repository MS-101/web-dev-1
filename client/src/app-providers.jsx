import React from "react";
import { AuthProvider } from "contexts/auth-context";
import { NavigationProvider } from "contexts/navigation-context";
import { ModalProvider } from "contexts/modal-context";

const providers = [AuthProvider, NavigationProvider, ModalProvider];

function AppProviders({ children }) {
	return providers.reduceRight((acc, Provider) => {
		return <Provider>{acc}</Provider>;
	}, children);
}

export default AppProviders;
