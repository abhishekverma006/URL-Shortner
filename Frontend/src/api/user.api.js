import axiosInstance from "./axiosInstance.api.js";

export const loginUser = async (password, email,username) =>{
    const {data} = await axiosInstance.post("/api/auth/login",{email,password,username})
    return data
}

export const registerUser = async (name,username,password,email) =>{
    const {data} = await axiosInstance.post("/api/auth/register",{name,username,email,password})
    return data
}

export const logoutUser = async () =>{
    const {data} = await axiosInstance.get("/api/auth/logout")
    return data
}

export const getCurrentUser = async () =>{
    const {data} = await axiosInstance.get("/api/auth/me")
    return data
}

export const getAllUserUrls = async () =>{
    const {data} = await axiosInstance.post("/api/user/urls")
    return data
}