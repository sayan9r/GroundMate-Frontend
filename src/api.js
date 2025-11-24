// Base API URL (read from Vite env). Use `VITE_API_URL` in your `.env` files.
export const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL ;

//Auth path segments and endpoints
export const AUTH_BASE = 'api/auth';
export const AUTH_LOGIN = `${AUTH_BASE}/login`;
export const AUTH_LOGOUT = `${AUTH_BASE}/logout`;
export const AUTH_REGISTER = `${AUTH_BASE}/register`;
export const AUTH_CONTACTUS = `${AUTH_BASE}/contactus`;
export const AUTH_CREATEGAME = `${AUTH_BASE}/creategame`;
export const AUTH_JOINGAME = `${AUTH_BASE}/joingame`;
export const AUTH_ALLCREATEGAME = `${AUTH_BASE}/allcreategame`;
export const AUTH_MYJOINEDGAMES = `${AUTH_BASE}/myjoinedgames`;
export const AUTH_JOINREQUEST = `${AUTH_BASE}/joinrequest`;
export const AUTH_JOINSTATUS = `${AUTH_BASE}/joinstatus`;
export const AUTH_LASTCREATEGAME = `${AUTH_BASE}/lastcreategame`;
export const AUTH_STARTGAME = `${AUTH_BASE}/startgame`;
export const AUTH_GAME_REQUESTS = `${AUTH_BASE}/game-requests`;
export const AUTH_TOTAL_ACCEPTED = `${AUTH_BASE}/total-accepted`;
export const AUTH_UPDATE_REQUESTS = `${AUTH_BASE}/update-requests`;

//  export const AUTH_LOGIN = `/login`;
//  export const AUTH_REGISTER = `/register`;