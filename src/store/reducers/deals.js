export const GET_ME_DEALS = "GET_ME_DEALS";
export const GET_DEALS = "GET_DEALS";
export const SET_SELECTED_DEAL = "SET_SELECTED_DEAL";
export const UNSET_SELECTED_DEAL = "UNSET_SELECTED_DEAL";

const initialState = {
  routePath: "",
  data: [],
  selectedDeal: null
};

const deals = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DEALS:
      return {
        ...state,
        data: payload.data
      };
    case SET_SELECTED_DEAL:
      return {
        ...state,
        selectedDeal: payload.deal
      };
    case UNSET_SELECTED_DEAL:
      return {
        ...state,
        selectedDeal: null
      };
    case GET_ME_DEALS:
      return {
        ...state,
        routePath: payload.name
      };
    default:
      break;
  }
  return state;
};

export default deals;
