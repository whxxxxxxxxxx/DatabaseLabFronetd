import axios from 'axios'
import { getToken, removeToken,getRefreshToken } from './token'
import router from '@/router'

const request = axios.create({
    baseURL: 'http://localhost:8001',
    // baseURL: 'http://192.168.50.89:8001',
    timeout: 5000
})

request.interceptors.request.use((config) => {
    const accessToken = getToken();  // 获取访问令牌
    const refreshToken = getRefreshToken();  // 假设你有类似的函数获取刷新令牌

    // 设置头部的access_token和refresh_token，确保它们被后端正确识别
    if (accessToken && refreshToken) {
        config.headers['access_token'] = accessToken;
        config.headers['refresh_token'] = refreshToken;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    if (error.response.status === 401) {
        removeToken()
        router.navigate('/login')
        window.location.reload()
    }
    return Promise.reject(error)
})

export {request}