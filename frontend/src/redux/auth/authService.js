import axios from 'axios'

const API_URL = 'http://localhost:4000/api/user'

// Register user
const register = async (userData) => {
  console.log(userData);
  const response = await axios.post(API_URL+'/register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// update user
const updateUser = async (userData) => {
    const response = await axios.patch(`${API_URL}/${userData.id}`,userData)
    if(response.data){
        return response.data;
    }
}

const deleteUser = async (userData) => {
    const response = await axios.delete(`${API_URL}/${userData.id}`);
    if(response.data){
        return response.data;
    }
}

const authService = {
  register,
  logout,
  login,
}

export default authService