// Base API URL (read from Vite env). Use `VITE_API_URL` in your `.env` files.
export const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL;

// Auth path segments
export const AUTH_BASE = "/api/auth";
export const AUTH_USER = "/api/users";
export const COMMUNITY = "/api/community";

// Auth Endpoints
export const AUTH_LOGIN = `${AUTH_BASE}/login`;
export const AUTH_LOGOUT = `${AUTH_BASE}/logout`;
export const AUTH_REGISTER = `${AUTH_BASE}/register`;

// User Endpoints
export const AUTH_CONTACTUS = `${AUTH_USER}/contactus`;
export const AUTH_CREATEGAME = `${AUTH_USER}/creategame`;
export const AUTH_JOINGAME = `${AUTH_USER}/joingame`;
export const AUTH_ALLCREATEGAME = `${AUTH_USER}/allcreategame`;
export const AUTH_MYJOINEDGAMES = `${AUTH_USER}/myjoinedgames`;
export const AUTH_JOINREQUEST = `${AUTH_USER}/joinrequest`;
export const AUTH_JOINSTATUS = `${AUTH_USER}/joinstatus`;
export const AUTH_LASTCREATEGAME = `${AUTH_USER}/lastcreategame`;
export const AUTH_STARTGAME = `${AUTH_USER}/startgame`;
export const AUTH_GAME_REQUESTS = `${AUTH_USER}/game-requests`;
export const AUTH_TOTAL_ACCEPTED = `${AUTH_USER}/total-accepted`;
export const AUTH_UPDATE_REQUESTS = `${AUTH_USER}/update-requests`;

// Community Endpoints
export const NEWCOMMUNITY = `${COMMUNITY}/newcommunity`;
export const CHECKCOMMUNITY = `${COMMUNITY}/checkcommunity`;
export const JOINCOMMUNITY = `${COMMUNITY}/join-community`;
export const REQUESTJOIN = `${COMMUNITY}/request-join`;
export const ALLREQUESTS = `${COMMUNITY}/all-requests`;