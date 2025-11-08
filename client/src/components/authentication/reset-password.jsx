import React, { useState } from "react";
import { useAuthContext } from "contexts/auth-context";
import "styles/modal.css";

function ResetPassword() {
	const { closeModal, showLogin } = useAuthContext();
	const [email, setEmail] = useState("");

	const onReturnClick = () => {
		showLogin();
	};

	const onCloseClick = () => {
		closeModal();
	};

	const onResetPasswordClick = () => {};

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

export default ResetPassword;
