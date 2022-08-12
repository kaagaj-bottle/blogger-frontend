import axios from "axios";
const baseUrl = "/api/users";

const signUp = async (userObj) => {
  const response = await axios.post(baseUrl, userObj);
  return response.data;
};

export default { signUp };
