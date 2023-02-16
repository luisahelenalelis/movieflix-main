import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { getAuthData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'https://movieflix-devsuperior.herokuapp.com';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'myclientid';
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'myclientsecret';

type LoginData = {
    username: string;
    password: string; 
}

export const requestBackendLogin = (loginData : LoginData) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    }

    const data = qs.stringify({ //monta a qs a partir de um objeto
        ...loginData,
        grant_type: 'password'
    });

    return axios({method: 'POST', baseURL: BASE_URL, url: '/oauth/token', data, headers})
}

export const requestBackend = (config: AxiosRequestConfig) => {
    const headers = config.withCredentials
      ? {
          ...config.headers,
          Authorization: 'Bearer ' + getAuthData().access_token,
        }
      : config.headers;
  
    return axios({ ...config, baseURL: BASE_URL, headers });
  };
  



