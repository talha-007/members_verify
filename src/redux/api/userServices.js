import { callAPi, callAPiMultiPart } from './http-common';

const login = (data) => callAPi.post('/admin/login', data);
const create = (data) => callAPiMultiPart.post('/api/user/create', data);
const getAll = (data) => callAPi.get('/api/admin/getAllUsers');
const getById = (id) => callAPi.get(`/api/admin/getUserById/${id}`);
const Update = (id, data) => callAPi.put(`/api/admin/updateUser/${id}`, data);
const deletee = (id, data) => callAPi.delete(`/api/admin/deleteUser/${id}`, data);

const authService = {
  login,
  create,
  getAll,
  getById,
  Update,
  deletee,
};

export default authService;
