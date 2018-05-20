import * as actions from "../actions/actions";

const initState = {
  appIsLoading: true,
  fadeOut: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.APP_IS_LOADED:
      return {
        ...state,
        appIsLoading: action.isLoading
      };
    case actions.LOADER_FADE:
      return {
        ...state,
        fadeOut: action.fadeOut
      };
    default:
      // Fall through
      break;
  }
  return state;
};

export default reducer;
