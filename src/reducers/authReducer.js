import { FETCH_USER, SIGNIN_ERROR } from "../actions/types";

export default (state = false, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || null;
    case SIGNIN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};
