import axios from "axios";

const baseUrl = "http://localhost:8081";

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
