import jwtDecode from "jwt-decode";
import { getAuthData } from "./storage";

type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
}

export const getTokenData = (): TokenData | undefined => {
  const loginResponse = getAuthData();
  try {
    return jwtDecode(loginResponse.access_token) as TokenData;
  }
  catch(e) {
    return undefined;
  }
}

export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  console.log('tokenData', tokenData);
  const aux = tokenData !== undefined && (tokenData.exp >= (Date.now() / 1000));
  console.log('aux', aux);
  return aux;
}

export const hasAnyRole = (roles: Role[]) => {
  if(roles.length === 0) return true;

  const tokenData = getTokenData();

  if(tokenData === undefined) return false;

  for(let i = 0; i < roles.length; i++) {
    if(tokenData.authorities.includes(roles[i])) return true;
  }

  return false;
}
