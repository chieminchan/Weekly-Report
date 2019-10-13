import axios from '@/utils/axios';

const LOAD_DEPT_LIST = '/api/dept';
export const loadDepts = () => axios.get(LOAD_DEPT_LIST);

const LOAD_DEPT_MEMBERS = '/api/dept/users';
export const loadDeptMembers = (params) => axios.post(LOAD_DEPT_MEMBERS, params);

const REMOVE_DEPT_MEMBER = '/api/dept/users/delete';
export const removeDeptMember = (params) => axios.post(REMOVE_DEPT_MEMBER, params);

const NEW_DEPT_MEMBER = '/api/dept/users/new';
export const newDeptMember = (params) => axios.post(NEW_DEPT_MEMBER, params);

const EDIT_DEPT_MEMBER = '/api/dept/users/edit';
export const editDeptMember = (params) => axios.post(EDIT_DEPT_MEMBER, params);