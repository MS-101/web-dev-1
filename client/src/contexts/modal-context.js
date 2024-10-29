import { useState, createContext, useContext } from "react";

export const ModalContext = createContext();

export const useModalContext = () => {
	return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
	const [modalType, setModalType] = useState(null);
	const [onResultCallback, setOnResultCallback] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (modalType, onResultCallback) => {
		setModalType(modalType);
		setOnResultCallback(onResultCallback);
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);

	const handleModalResult = (result) => {
		if (onResultCallback) onResultCallback(result);
		closeModal();
	};

	return (
		<ModalContext.Provider
			value={{
				modalType,
				isModalOpen,
				openModal,
				closeModal,
				handleModalResult,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
