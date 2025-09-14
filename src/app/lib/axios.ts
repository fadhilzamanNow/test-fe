import axios from "axios"

const api = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BACKEND_URL,
    headers : {
        'Content-Type'  : "application/json"
    }
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`

    return config;
})

export default api;