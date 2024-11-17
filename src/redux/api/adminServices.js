import { callAPi } from './http-common';

const listUpload = (data) => callAPi.post('/api/admin/list-upload', data);
const sendEmail = (id, data) => callAPi.post(`/api/admin/send-email/${id}`, data);
const getAssoc = () => callAPi.get(`/api/admin/getAssoc`);

const adminService = {
  listUpload,
  sendEmail,
  getAssoc,
};

export default adminService;
