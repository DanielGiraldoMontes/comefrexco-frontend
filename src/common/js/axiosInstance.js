import axios from 'axios';
import promise from 'promise';
import UtilService from './util.service';

// Add a request interceptor 
const axiosInstance = axios.create();

// Request
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent 
    //If the header does not contain the token and the url not public, redirect to login  
    var accessToken = getToken();

    //if token is found add it to the header
    if (accessToken) {
        if (config.method !== 'OPTIONS') {
            config.headers.authorization = 'bearer ' + accessToken;
        }
    }
    return config;
}, function (error) {
    // Do something with request error 
    return promise.reject(error);
});

// Response
axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    switch (error.response.status) {
        case 401:
            UtilService.closeSession();
            break;
        default:
            console.log(error.response);
            break;
    }
    // Do something with request error 
    return promise.reject(error);
});


function getToken() {
    let strSession = localStorage.getItem('session');
    if (strSession) {
        return JSON.parse(strSession).token;
    }
}

export default axiosInstance;