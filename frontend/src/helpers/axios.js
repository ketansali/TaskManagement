import axios from 'axios';
import {api } from '../configs/urlConfig';


//const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        //'Authorization': token ? `Bearer ${token}` : ''
        'Content-Type': 'multipart/form-data'
    }
});

//axiosIntance.interceptors.request.use((req) => {
    // const { auth } = store.getState();
    // if(auth.token){
    //     req.headers.Authorization = `Bearer ${auth.token}`;
    // }
    // return req;
//})



export default axiosIntance;