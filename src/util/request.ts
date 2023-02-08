import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { LoginForm } from '../types/domain/LoginForm';
import { getAuthData } from './storage';

const BASE_URL = 'http://localhost:8080';

const CLIENT_ID = "myclientid";
const CLIENT_SECRET = "myclientsecret";

const basicHeader = () => {
  return `Basic ${ window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`) }`;
}

export const requestBackendLogin = (loginForm: LoginForm) => {

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader()
  }

  const data = qs.stringify({
    username: loginForm.username,
    password: loginForm.password,
    grant_type: 'password'
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    headers,
    data
  });

}

export const requestBackend = (config: AxiosRequestConfig) => {

  const headers = config.withCredentials ? {
    Authorization: 'Bearer ' + getAuthData().access_token
  } : config.headers;

  const newConfig: AxiosRequestConfig = { ...config, headers, baseURL: BASE_URL };

  return axios(newConfig);
}

export const getResponseStatusFromErrorRequest = (e: unknown) => {
  return (e as any)?.request?.status as number | undefined;
}

export const isUnauthorized = (status : number | undefined): boolean => {
  return status !== undefined && status === 401;
}

export const isForbidden = (status : number | undefined) => {
  return status !== undefined && status === 403;
}

export const isUnprocessableEntity = (status: number | undefined) => {
  return status !== undefined && status === 422;
}
