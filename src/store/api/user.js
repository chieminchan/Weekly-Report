import axios from '@/utils/axios';

const LOGIN_URL = '/api/auth/login';
export const login = (params) => axios.post(LOGIN_URL, params);

const LOGOUT_URL = '/api/auth/logout';
export const logout = (params) => axios.post(LOGOUT_URL, params);

const LOAD_USER_INFO = '/api/auth/info';
export const loadUserInfo = () => axios.get(LOAD_USER_INFO);