import * as actions from "../actions/actions";
import { GRAPHS_DATA } from "../../const/GRAPHS_DATA";

const initState = {
  results: GRAPHS_DATA
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.CHANGE_GRAPHS:
      return {
        ...state,
        results: action.results
      };
    default:
      // Fall through
      break;
  }
  return state;
};

export default reducer;
