import axios from 'axios';

axios.defaults.baseURL = 'https://api.fabrica.ir/';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

