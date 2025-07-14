import {
  FETCH_ADS_START,
  FETCH_ADS_SUCCESS,
  FETCH_ADS_FAIL,
  ACCEPT_AD_SUCCESS,
  REMOVE_AD_SUCCESS,
  REJECT_AD_SUCCESS,
  REMOVE_AD_START,
  FETCH_DETAIL_FAIL,
  FETCH_DETAIL_START,
  FETCH_DETAIL_SUCCESS,
} from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
  advertises: [],
  advertise: '',
  limit: 20,
  count: null,
  page: 1,
  loading: false,
  removing: false,
};

// Fetch advertises

const fetchAdsStart = (state, payload) => {
  return updateObject(state, { loading: true });
};

const fetchAdsSuccess = (state, payload) => {
  return updateObject(state, {
    advertises: payload.data,
    count: Math.ceil(payload.count / state.limit),
    loading: false,
  });
};

const fetchAdsFail = (state, payload) => {
  return updateObject(state, { loading: false });
};

// Accept advertise

const changeAdStatusSuccess = (state, payload) => {
  const advertises = [...state.advertises];
  const index = advertises.findIndex((advertise) => advertise._id === payload);
  advertises[index].is_accepted = true;
  return updateObject(state, {
    advertises: advertises,
  });
};

// Remove advertise

const removeAdStart = (state, payload) => {
  return updateObject(state, {
    removing: true,
  });
};

const removeAdSuccess = (state, payload) => {
  const advertises = [...state.advertises];
  const index = advertises.findIndex((advertise) => advertise._id === payload);
  advertises.splice(index, 1);
  return updateObject(state, {
    advertises: advertises,
    removing: false,
  });
};

// Reject advertise

const rejectAdSuccess = (state, payload) => {
  const advertises = [...state.advertises];
  const index = advertises.findIndex((advertise) => advertise._id === payload);
  advertises.splice(index, 1);
  return updateObject(state, {
    advertises: advertises,
  });
};

// Fetch advertises detail

const fetchDetailStart = (state, payload) => {
  return updateObject(state, { loading: true });
};

const fetchDetailSuccess = (state, payload) => {
  return updateObject(state, {
    advertise: payload,
    loading: false,
  });
};

const fetchDetailFail = (state, payload) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ADS_START:
      return fetchAdsStart(state, payload);
    case FETCH_ADS_SUCCESS:
      return fetchAdsSuccess(state, payload);
    case FETCH_ADS_FAIL:
      return fetchAdsFail(state, payload);
    case ACCEPT_AD_SUCCESS:
      return changeAdStatusSuccess(state, payload);
    case REMOVE_AD_SUCCESS:
      return removeAdSuccess(state, payload);
    case REMOVE_AD_START:
      return removeAdStart(state, payload);
    case REJECT_AD_SUCCESS:
      return rejectAdSuccess(state, payload);
    case FETCH_DETAIL_START:
      return fetchDetailStart(state, payload);
    case FETCH_DETAIL_SUCCESS:
      return fetchDetailSuccess(state, payload);
    case FETCH_DETAIL_FAIL:
      return fetchDetailFail(state, payload);
    default:
      return state;
  }
};

export default reducer;
