const AUTH_DATA = 'authData';

type LoginResponse = {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
};

export const saveAuthData = (loginResponse: LoginResponse) => {
  localStorage.setItem(AUTH_DATA, JSON.stringify(loginResponse));
}

export const getAuthData = () => {
  const obj = localStorage.getItem(AUTH_DATA) ?? '{}';
  return JSON.parse(obj) as LoginResponse;
}

export const removeAuth = () => {
  localStorage.removeItem(AUTH_DATA);
}
