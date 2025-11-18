import axios from 'axios';
import axiosInstance from './axiosInstance.api.js';

export const createShortUrl = async (url) => {
    const {data} = await axiosInstance.post("/api/create", {
      url,
    });
    console.log(data)
    return data.shortUrl;
}