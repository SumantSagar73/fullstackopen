import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

// ✅ Always return response.data
const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(response => response.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove
};
