import { UPDATE_HEALTH } from 'constants/actions';

const defaultState = {
  message: '',
};

export default function healthReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_HEALTH:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}
