import { SET_HOVER_LOCATION, SET_WORK_LOCATION, SET_SEEK_LOCATIONS } from 'constants/actions';

export const setHoverLocation = (payload) => ({
  type: SET_HOVER_LOCATION,
  payload,
});

export const setWorkLocation = (payload) => ({
  type: SET_WORK_LOCATION,
  payload,
});

export const setSeekLocations = (payload) => ({
  type: SET_SEEK_LOCATIONS,
  payload,
});
