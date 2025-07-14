import { combineReducers } from 'redux';
import auth from './auth';
import advertise from './advertise';
import category from './category';

export default combineReducers({
  auth,
  advertise,
  category,
});
