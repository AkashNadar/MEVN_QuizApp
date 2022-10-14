import axios from "axios";

const URL = "/users";

const addUser = async (data) => {
  const response = await axios.post(`${URL}/signup`, data);
  return response;
};

const loginUser = async (data) => {
  console.log("working in user");
  console.log(data);
  const response = await axios.post(`${URL}/login`, data);
  console.log(response);
  return response;
};

export { addUser, loginUser };
