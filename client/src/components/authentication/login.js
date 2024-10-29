import React, { useState } from "react";
import { useAuthContext } from "contexts/auth-context";
import { ModalTypes } from "components/modal";
import { useModalContext } from "contexts/modal-context";
import AuthService from "services/auth-service";
import "styles/auth-modal.css";

function Login() {
	const { openModal, closeModal } = useModalContext;
	const { setAuthentication } = useAuthContext;
	const [usernameOrEmail, setUsernameOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const onCloseClick = () => {
		setErrorMessage(null);
		closeModal();
	};

	const onForgotPasswordClick = () => {
		openModal(ModalTypes.RESET_PASSWORD);
	};

	const onShowRegisterClick = () => {
		openModal(ModalTypes.REGISTER);
	};

	const onLoginClick = () => {
		AuthService.login(usernameOrEmail, password)
			.then((data) => {
				setAuthentication(data);
				closeModal();
			})
			.catch((error) => {
				setErrorMessage(error);
			});
	};

	return (
		<>
			<div className="modal-header">
				<h2 className="title">Login</h2>
				<button className="close-btn" onClick={onCloseClick}>
					&times;
				</button>
			</div>
			<div className="modal-body">
				<div className="input-container">
					<label>Username/Email:</label>
					<input
						type="text"
						autoComplete="username"
						value={usernameOrEmail}
						onChange={(e) => setUsernameOrEmail(e.target.value)}
					/>
				</div>
				<div className="input-container">
					<label>Password:</label>
					<input
						type="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="spacer"></div>
			</div>
			<div className="modal-footer">
				{errorMessage && <p className="error-message">{errorMessage}</p>}
				<button className="link-btn" onClick={onForgotPasswordClick}>
					Forgot your password?
				</button>
				<p>
					Don't have an account?{" "}
					<button className="link-btn" onClick={onShowRegisterClick}>
						Register
					</button>
				</p>
				<button className="submit-btn" type="submit" onClick={onLoginClick}>
					Login
				</button>
			</div>
		</>
	);
}

export default Login;
