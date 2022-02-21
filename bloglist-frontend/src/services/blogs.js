import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';
const userURL = 'http://localhost:3001/api/users';

let token = null;
const setToken = newToken => {
  token = 'bearer ' + newToken;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const getUserBlogs = (userID) => {

  const config = {
    headers: { Authorization: token }
  };
  const request = axios.get(`${userURL}/${userID}`, config);
  return request.then(response => response.data);
};
const addNewBlog = (body) => {
  const config = {
    headers: { Authorization: token }
  };

  const request = axios.post(baseUrl, body, config);
  return request.then(response => response.data);
};

const updatelikes = async(id, data) => {
  const config = {
    headers: {
      Authorization: token
    }
  };
  const updateBlog = await axios.put(`${baseUrl}/${id}`, data, config);
  return updateBlog.data;
};

const deleteBlog = async(id) => {
  // const config = {
  //   headers: {
  //     Authorization: token
  //   }
  // }
  const deletedBlog = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  });
  return deletedBlog;
};

const blogService = { getAll, setToken, getUserBlogs, addNewBlog, updatelikes, deleteBlog };

export default blogService;