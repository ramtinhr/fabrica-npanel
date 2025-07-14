import {
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_START,
  EDIT_CATEGORY_START,
  EDIT_CATEGORY_SUCCESS,
} from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  categories: [],
  limit: 20,
  count: null,
  page: 1,
  loading: false,
  removing: false,
  editing: false,
};

// Fetch advertises

const fetchCategoriesStart = (state, payload) => {
  return updateObject(state, { loading: true });
};

const fetchCategoriesSuccess = (state, payload) => {
  return updateObject(state, {
    categories: payload.data,
    count: Math.ceil(payload.count / state.limit),
    loading: false,
  });
};

const fetchCategoriesFail = (state, payload) => {
  return updateObject(state, { loading: false });
};

// Remove category

const removeCategoryStart = (state, payload) => {
  return updateObject(state, {
    removing: true,
  });
};

const removeCategorySuccess = (state, payload) => {
  const categories = [...state.categories];
  const index = categories.findIndex((category) => category._id === payload);
  categories.splice(index, 1);
  return updateObject(state, {
    categories: categories,
    removing: false,
  });
};

// edit category

const editCategoryStart = (state, payload) => {
  return updateObject(state, {
    editing: true,
  });
};

const editCategorySuccess = (state, payload) => {
  const categories = [...state.categories];
  const index = categories.findIndex((category) => category._id === payload.id);
  categories[index].title = payload.title;
  categories[index].order = payload.order;
  return updateObject(state, {
    categories: categories,
    editing: false,
  });
};


const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CATEGORIES_START:
      return fetchCategoriesStart(state, payload);
    case FETCH_CATEGORIES_SUCCESS:
      return fetchCategoriesSuccess(state, payload);
    case FETCH_CATEGORIES_FAIL:
      return fetchCategoriesFail(state, payload);
    case REMOVE_CATEGORY_SUCCESS:
      return removeCategorySuccess(state, payload);
    case REMOVE_CATEGORY_START:
      return removeCategoryStart(state, payload);
    case EDIT_CATEGORY_SUCCESS:
      return editCategorySuccess(state, payload);
    case EDIT_CATEGORY_START:
      return editCategoryStart(state, payload);
    default:
      return state;
  }
};

export default reducer;
