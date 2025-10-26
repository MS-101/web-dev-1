import { useState, useRef, createContext, useContext } from "react";

export const ModalContext = createContext();

export const useModalContext = () => {
	return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
	const [modalType, setModalType] = useState(null);
	const [modalArgs, setModalArgs] = useState(null);
	const onResultCallbackRef = useRef(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (modalType, modalArgs, onResultCallback) => {
		setModalType(modalType);
		setModalArgs(modalArgs);
		onResultCallbackRef.current = onResultCallback;
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);

	const handleModalResult = async (result) => {
		if (onResultCallbackRef.current) await onResultCallbackRef.current(result);
		closeModal();
	};

	return (
		<ModalContext.Provider
			value={{
				modalType,
				modalArgs,
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
