import * as actions from "../actions/actions";

const initState = {
  territories: []
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.TERRITORIES_FETCHED:
      return {
        ...state,
        territories: action.territories
      };
    default:
      // Fall through
      break;
  }
  return state;
};

export default reducer;
