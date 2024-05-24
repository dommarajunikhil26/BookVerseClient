import axios from "axios";
import Store from '../redux/Store';
import { clearUser } from "../redux/authSlice";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('idToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('idToken');
            Store.dispatch(clearUser());
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
