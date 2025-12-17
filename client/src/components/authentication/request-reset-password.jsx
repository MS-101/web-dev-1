import React, { useState } from "react";
import { useModalContext } from "contexts/modal-context";
import { ModalTypes } from "components/modal";
import AuthService from "services/auth-service";

function RequestResetPassword() {
	const { openModal, closeModal } = useModalContext();
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const onReturnClick = () => {
		openModal(ModalTypes.LOGIN);
	};

	const onCloseClick = () => {
		closeModal();
	};

	const onResetPasswordClick = () => {
		AuthService.resetPassword(email)
			.then((data) => {
				setErrorMessage(data.message);
			})
			.catch((error) => {
				setErrorMessage(error);
			});
	};

	return (
		<>
			<div className="modal-header">
				<button className="return-btn" onClick={onReturnClick}>
					&lt;
				</button>
				<h2 className="title">Reset Password</h2>
				<button className="close-btn" onClick={onCloseClick}>
					&times;
				</button>
			</div>
			<div className="modal-body">
				<div className="input-container">
					<label>Email:</label>
					<input
						type="email"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
			</div>
			<div className="modal-footer">
				{errorMessage && <p className="error-message">{errorMessage}</p>}
				<button
					className="submit-btn"
					type="submit"
					onClick={onResetPasswordClick}
				>
					Reset Password
				</button>
			</div>
		</>
	);
}

export default RequestResetPassword;
