import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { LoginForm } from '../types/LoginForm';

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