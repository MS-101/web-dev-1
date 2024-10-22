import axios from "axios";

const baseUrl = "http://localhost:8081";

export const publicAxios = axios.create({
	baseUrl: baseUrl,
});

export const authAxios = (accessToken) => {
	return axios.create({
		baseURL: baseUrl,
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
