import { FETCH_SUCCESS, FETCH_NOTFOUND } from '../actions/types';

const initialState = {
  resume: '',
  loading: true,
  notFound: ''
};

export default function CvReducer (state = initialState, action) {
  switch(action.type) {
    case FETCH_NOTFOUND:
      return {
        ...state,
        loading: false,
        notFound: true
      }
    case FETCH_SUCCESS:
      // return default json
      return {
        ...state,
        resume: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
