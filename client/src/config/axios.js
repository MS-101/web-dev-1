import axios from "axios";

const baseUrl = process.env.REACT_APP_SERVER_URL;

export const publicAxios = axios.create({
	baseURL: baseUrl,
});

export const authAxios = (token) => {
	return axios.create({
		baseURL: baseUrl,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
