import { GET_HEALTH, UPDATE_HEALTH } from '../../constants/actions';

export const getHealth = () => ({
  type: GET_HEALTH,
});

export const updateHealth = (payload) => ({
  type: UPDATE_HEALTH,
  payload,
});
