import React from "react";
import Modal from "react-modal";
import { useModalContext } from "contexts/modal-context";
import Login from "./authentication/login";
import Register from "./authentication/register";
import ResetPassword from "./authentication/reset-password";
import CreateCommunity from "./community/create-community";
import EditCommunity from "./community/edit-community";
import CreatePost from "./post/create-post";

export const ModalTypes = {
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	RESET_PASSWORD: "RESET_PASSWORD",
	CREATE_COMMUNITY: "CREATE_COMMUNITY",
	EDIT_COMMUNITY: "EDIT_COMMUNITY",
	CREATE_POST: "CREATE_POST",
};

const ModalWrapper = () => {
	const { modalType, modalArgs, isModalOpen, closeModal } = useModalContext();

	const renderContent = () => {
		switch (modalType) {
			case ModalTypes.LOGIN:
				return <Login />;
			case ModalTypes.REGISTER:
				return <Register />;
			case ModalTypes.RESET_PASSWORD:
				return <ResetPassword />;
			case ModalTypes.CREATE_COMMUNITY:
				return <CreateCommunity />;
			case ModalTypes.EDIT_COMMUNITY:
				return <EditCommunity {...modalArgs} />;
			case ModalTypes.CREATE_POST:
				return <CreatePost />;
			default:
				return null;
		}
	};

	return (
		<Modal
			isOpen={isModalOpen}
			onRequestClose={closeModal}
			ariaHideApp={false}
			className="modal-content"
			overlayClassName="modal-overlay"
		>
			{renderContent()}
		</Modal>
	);
};

export default ModalWrapper;
