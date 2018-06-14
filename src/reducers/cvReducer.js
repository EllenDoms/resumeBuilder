import { FETCH_SUCCESS1, FETCH_SUCCESSOWN, FETCH_LOADING, FETCH_NOTFOUND } from '../actions/types';

const initialState = {
  resumes: '',
  loading: true,
  notFound: ''
};

export default function CvReducer (state = initialState, action) {
  switch(action.type) {
    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
        notFound: false
      }
    case FETCH_NOTFOUND:
      return {
        ...state,
        loading: false,
        notFound: true
      }
    case FETCH_SUCCESS1:
      // return default json
      return {
        ...state,
        id: action.payload.id,
        current: action.payload.current,
        loading: false
      };
      case FETCH_SUCCESSOWN:
        // return default json
        return {
          ...state,
          resumes: action.payload,
          loading: false
        };
    default:
      return state;
  }
}
