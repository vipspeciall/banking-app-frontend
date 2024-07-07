import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('Token is missing or malformed');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const register = (data) => api.post('/auth/register', data);

export const login = (data) => {
    return api.post('/auth/login', data)
        .then(response => {
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
            }
            return response;
        })
        .catch(error => {
            console.error('Login error:', error);
            throw error;
        });
};

export const createAccount = (data) => api.post('/accounts', data);
export const getAccountDetails = (id) => api.get(`/accounts/${id}`);
export const transferMoney = (data) => api.post('/transactions/transfer', data);
export const getTransactionHistory = (accountId) => api.get(`/transactions/account/${accountId}`);
