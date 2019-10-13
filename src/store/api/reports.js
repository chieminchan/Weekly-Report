import axios from '@/utils/axios';

const LOAD_MEMBERS_URL = '/api/dept/members';
export const loadMembers = () => axios.get(LOAD_MEMBERS_URL);

const ADD_REPORT_URL = '/api/report';
export const addReport = (params) => axios.post(ADD_REPORT_URL, params);

const LOAD_REPORTS_URL = '/api/reports';
export const loadReports = (params) => axios.post(LOAD_REPORTS_URL, params);

const LOAD_REPORTS_CC = '/api/reportcc';
export const loadCcReports = (params) => axios.post(LOAD_REPORTS_CC, params);