
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout : 10000,  //10s,
    withCredentials: true,
});

export default axiosInstance;