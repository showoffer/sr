import * as actions from "../actions/actions";

const initState = {
  fileLoaded: false,
  regions: [],
  checkAll: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.FILE_IS_LOADED:
      return {
        ...state,
        fileLoaded: action.isLoaded
      };
    case actions.REGIONS_FETCHED:
      return {
        ...state,
        regions: action.regions
      };
    case actions.CHECK_ALL_REGIONS_TERRITORIES:
      return {
        ...state,
        checkAll: action.value
      };
    default:
      // Fall through
      break;
  }
  return state;
};

export default reducer;
