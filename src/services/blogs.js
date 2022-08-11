import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUserBlogs = async (username) => {
  const response = await axios.get(`${baseUrl} / user/${username}}`);
};

const create = async (blogObject) => {
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const update = async (id, blogObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObject);
  return response.data;
};

export default { getAll, create, setToken, remove, update, getUserBlogs };
