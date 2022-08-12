import axios from "axios";
const baseUrl = "/api/users";

const login = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { login };
