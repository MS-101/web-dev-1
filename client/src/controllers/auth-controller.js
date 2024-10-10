import axios from "axios";

const baseUrl = 'http://localhost:8081'

export const login = (usernameOrEmail, password) => {
    return new Promise((resolve, reject) => {
        axios.post(new URL('/auth/login', baseUrl).href, {
            'usernameOrEmail': usernameOrEmail,
            'password': password,
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response.data.message);
        });
    });
}

export const register = (username, email, password) => {
    return new Promise((resolve, reject) => {
        axios.post(new URL('/auth/register', baseUrl).href, {
            'username': username,
            'email': email,
            'password': password,
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            const message = error.response.data.message;

            reject(message);
        })
    })
}

export const refresh = (refreshToken) => {
    return new Promise((resolve, reject) => {
        axios.post(new URL('/auth/refresh', baseUrl).href, {
            'refreshToken': refreshToken
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            const message = error.response.data.message;

            reject(message);
        })
    });
}