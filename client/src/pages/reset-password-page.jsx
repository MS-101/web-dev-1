import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthService from "services/auth-service";
import "styles/pages/reset-password-page.scss";

const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const resetToken = searchParams.get("reset-token");

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const passwordsMatch = password === confirmPassword;

	const [finished, setFinished] = useState(false);

	const onResetPasswordClick = () => {
		if (!passwordsMatch) {
			setErrorMessage("Passwords do not match!");
			return;
		}

		AuthService.resetPassword(resetToken, password)
			.then(() => {
				setTimeout(() => {
					navigate("/");
				}, 5000);
				setFinished(true);
			})
			.catch((error) => {
				setErrorMessage(error);
			});
	};

	return finished ? (
		<div className="reset-password-page">
			<h2>Password reset was successful!</h2>
			<p>You will be redirected after a few seconds.</p>
		</div>
	) : (
		<form className="reset-password-form">
			<div className="input-container">
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className="input-container">
				<label>Confirm password:</label>
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>
			<p className="error-message">{errorMessage}</p>
			<button
				className="submit-btn"
				type="submit"
				onClick={onResetPasswordClick}
			>
				Change password
			</button>
		</form>
	);
};

export default ResetPasswordPage;
