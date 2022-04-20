import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../../constants/actions';

export const showSnackbar = (payload) => ({
  type: SHOW_SNACKBAR,
  payload,
});

export const hideSnackbar = () => ({
  type: HIDE_SNACKBAR,
});
