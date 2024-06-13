import axios from "axios";
const baseUrl = "https://bloglistbackend-ffe79c80663f.herokuapp.com/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
