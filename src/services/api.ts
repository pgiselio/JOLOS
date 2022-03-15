import axios from 'axios';
import { getUserLocalStorage } from '../contexts/AuthContext/util';

export const Api = axios.create({
    baseURL: "https://reqres.in/api"
});

Api.interceptors.request.use(
    (config) =>{
        const user = getUserLocalStorage();
        
        config.headers = {
            Authorization: `Bearer ${user?.token}`,
        };
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }
) 