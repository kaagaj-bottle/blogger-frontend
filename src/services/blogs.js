import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blogObject, config);
  return response.data;
};

export default { getAll, create, setToken };
