import { useState, useRef, createContext, useContext } from "react";

export const ModalContext = createContext();

export const useModalContext = () => {
	return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
	const [modalType, setModalType] = useState(null);
	const onResultCallbackRef = useRef(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (modalType, onResultCallback) => {
		setModalType(modalType);
		onResultCallbackRef.current = onResultCallback;
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);

	const handleModalResult = (result) => {
		if (onResultCallbackRef.current) onResultCallbackRef.current(result);
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
