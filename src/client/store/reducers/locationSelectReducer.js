import { SET_HOVER_LOCATION, SET_WORK_LOCATION, SET_SEEK_LOCATIONS } from 'constants/actions';

const defaultState = {
  hoverLocation: 'Move the cursor over the map',
  workLocation: 'Downtown',
  seekLocations: ['Dunbar-Southlands', 'Kitsilano'],
};

export default function healthReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_HOVER_LOCATION:
      return {
        ...state,
        hoverLocation: action.payload,
      };
    case SET_WORK_LOCATION:
      return {
        ...state,
        workLocation: action.payload,
      };
    case SET_SEEK_LOCATIONS:
      return {
        ...state,
        seekLocations: action.payload,
      };
    default:
      return state;
  }
}
