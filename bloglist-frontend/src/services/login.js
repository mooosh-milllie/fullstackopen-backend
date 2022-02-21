import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const login = async loginInfo => {
  const response = await axios.post(baseUrl, loginInfo);
  return response.data;
};
const loginService = { login };
export default loginService;