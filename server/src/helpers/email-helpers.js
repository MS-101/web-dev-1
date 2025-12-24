import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	return transporter
		.sendMail({
			from: process.env.EMAIL_USER,
			to: to,
			subject: subject,
			html: html,
		})
		.then((info) => {
			return true;
		})
		.catch((error) => {
			return false;
		});
};
