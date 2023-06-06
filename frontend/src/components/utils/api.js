import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

export async function login(username, password) {
  try {
    const response = await instance.post('/api/login', { username, password });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error(response.data.message);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signup(username, password, usersName) {
  try {
    const response = await instance.post('/api/signup', {
      username,
      password,
      usersName,
    });
    if (response.status === 201) {
      return response.data;
    }
    throw new Error(response.data.message);
  } catch (error) {
    throw new Error(error.message);
  }
}
