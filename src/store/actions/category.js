import axios from 'axios';
import {
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  REMOVE_CATEGORY_START,
  REMOVE_CATEGORY_SUCCESS,
  EDIT_CATEGORY_START,
  EDIT_CATEGORY_SUCCESS,
} from './actionTypes';

// Fetch categories

export const fetchCategoriesStart = () => {
  return {
    type: FETCH_CATEGORIES_START,
  };
};

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const fetchCategoriesFail = (error) => {
  return {
    type: FETCH_CATEGORIES_FAIL,
    payload: error,
  };
};

export const fetchCategories = (limit, page) => async (dispatch) => {
  try {
    dispatch(fetchCategoriesStart());
    const response = await axios.get('panel/categories', {
      params: {
        limit,
        page,
      },
    });
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (err) {
    dispatch(fetchCategoriesFail(err));
  }
  return;
};


// Remove Category

export const removeCategoryStart = (payload) => {
  return {
    type: REMOVE_CATEGORY_START,
    payload,
  };
};

export const removeCategorySuccess = (payload) => {
  return {
    type: REMOVE_CATEGORY_SUCCESS,
    payload,
  };
};

export const removeCategory = (id) => async (dispatch) => {
  try {
    dispatch(removeCategoryStart());
    await axios.delete(`panel/categories/${id}`, { accept: true });
    dispatch(removeCategorySuccess(id));
  } catch (err) {
    return err;
  }
  return;
};

// Edit Category

export const editCategoryStart = (payload) => {
  return {
    type: EDIT_CATEGORY_START,
    payload,
  };
};

export const editCategorySuccess = (payload) => {
  return {
    type: EDIT_CATEGORY_SUCCESS,
    payload,
  };
};

export const editCategory = (id, title, order) => async (dispatch) => {
  try {
    dispatch(editCategoryStart());
    await axios.put(`panel/categories/${id}`, { title, order });
    dispatch(editCategorySuccess({ id, title, order }));
  } catch (err) {
    return err;
  }
  return;
};