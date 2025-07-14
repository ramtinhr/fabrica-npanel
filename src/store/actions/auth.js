import axios from 'axios';
import { AUTH_LOGIN, CHECK_AUTH, AUTH_LOGOUT } from './actionTypes';
import { setAuthToken } from '../../helpers/axios'

export const checkAuthentication = () => (dispatch) => {
  let isAuthenticated = false;
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    isAuthenticated = true;
  }
  dispatch({
    type: CHECK_AUTH,
    payload: isAuthenticated,
  });
};

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post('users/auth/simple', {
      username,
      password,
    });
    if (response.data.message.status === 200) {
      dispatch({
        type: AUTH_LOGIN,
        payload: response.data.data,
      });
      dispatch(checkAuthentication())
    }
    return response;
  } catch (err) {
    return err.response;
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: AUTH_LOGOUT });
};
