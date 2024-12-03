import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:4000/', // Adjust Flask URL if needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;