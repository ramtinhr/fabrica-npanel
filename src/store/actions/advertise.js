import axios from 'axios';
import {
  FETCH_ADS_START,
  FETCH_ADS_FAIL,
  FETCH_ADS_SUCCESS,
  ACCEPT_AD_SUCCESS,
  REMOVE_AD_SUCCESS,
  REJECT_AD_SUCCESS,
  REMOVE_AD_START,
  FETCH_DETAIL_FAIL,
  FETCH_DETAIL_START,
  FETCH_DETAIL_SUCCESS,
} from './actionTypes';

// Fetch advertises

export const fetchAdsStart = () => {
  return {
    type: FETCH_ADS_START,
  };
};

export const fetchAdsSuccess = (advertises) => {
  return {
    type: FETCH_ADS_SUCCESS,
    payload: advertises,
  };
};

export const fetchAdsFail = (error) => {
  return {
    type: FETCH_ADS_FAIL,
    payload: error,
  };
};

export const fetchAds = (limit, page) => async (dispatch) => {
  try {
    dispatch(fetchAdsStart());
    const response = await axios.get('panel/ads', {
      params: {
        limit,
        page,
      },
    });
    dispatch(fetchAdsSuccess(response.data));
  } catch (err) {
    dispatch(fetchAdsFail(err));
  }
  return;
};

// Change advertise status

export const acceptAdSuccess = (id) => {
  return {
    type: ACCEPT_AD_SUCCESS,
    payload: id,
  };
};

export const acceptAd = (id) => async (dispatch) => {
  try {
    await axios.put(`panel/ads/${id}`, { accept: true });
    dispatch(acceptAdSuccess(id));
  } catch (err) {
    return err;
  }
  return;
};

// Remove Ad

export const removeAdStart = (payload) => {
  return {
    type: REMOVE_AD_START,
    payload,
  };
};

export const removeAdSuccess = (payload) => {
  return {
    type: REMOVE_AD_SUCCESS,
    payload,
  };
};

export const removeAd = (id) => async (dispatch) => {
  try {
    dispatch(removeAdStart());
    await axios.delete(`panel/ad/${id}`, { accept: true });
    dispatch(removeAdSuccess(id));
  } catch (err) {
    return err;
  }
  return;
};

// Reject Ad

export const rejectAdSuccess = (payload) => {
  return {
    type: REJECT_AD_SUCCESS,
    payload,
  };
};

export const rejectAd = (id, cause) => async (dispatch) => {
  try {
    await axios.put(`panel/ad/${id}`, {
      decline: { non_acceptance_cause: cause },
    });
    dispatch(rejectAdSuccess(id));
  } catch (err) {
    return err;
  }
  return;
};

// Fetch advertise detail

export const fetchDetailStart = () => {
  return {
    type: FETCH_DETAIL_START,
  };
};

export const fetchDetailSuccess = (advertise) => {
  return {
    type: FETCH_DETAIL_SUCCESS,
    payload: advertise,
  };
};

export const fetchDetailFail = (error) => {
  return {
    type: FETCH_DETAIL_FAIL,
    payload: error,
  };
};

export const fetchDetail = (id) => async (dispatch) => {
  try {
    dispatch(fetchDetailStart());
    const response = await axios.get(`panel/ads/${id}`);
    dispatch(fetchDetailSuccess(response.data.data));
  } catch (err) {
    dispatch(fetchDetailFail(err));
  }
  return;
};
