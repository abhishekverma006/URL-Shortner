
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.VITE_BASE_URL || 'http://localhost:8000'}`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout : 10000,  //10s,
    withCredentials: true,
});

export default axiosInstance;