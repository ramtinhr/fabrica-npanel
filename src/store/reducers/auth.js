import { AUTH_LOGIN, CHECK_AUTH, AUTH_LOGOUT } from '../actions/actionTypes';
import { setAuthToken } from '../../helpers/axios';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_LOGIN:
      localStorage.setItem('token', payload.access_token);
      setAuthToken(payload.access_token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case CHECK_AUTH:
      return {
        ...state,
        ...payload,
        isAuthenticated: payload,
      };
    case AUTH_LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
