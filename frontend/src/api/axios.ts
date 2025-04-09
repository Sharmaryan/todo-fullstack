import axios from "axios";
import { TOKEN } from "../utils/constants";

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use((config) => {
    const excludedPaths = ["/signin", "/signup"];
    const isExcluded = excludedPaths.some((path) =>
        config.url?.includes(path)
    );

    if (!isExcluded) {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, (error) => Promise.reject(error))

export default api;