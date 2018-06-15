import { FETCH_SUCCESS, FETCH_LOADING, FETCH_NOTFOUND, SET_RESUME_ACTIVE, SET_FORMTAB_ACTIVE } from '../actions/types';

const initialState = {
  active: '',
  resumes: {},
  loading: true,
  notFound: '',
  formtab: 'Template'
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
    case FETCH_SUCCESS:
      // return default json
      return {
        ...state,
        resumes: action.payload,
        loading: false
      };
    case SET_RESUME_ACTIVE:
      // return default json
      return {
        ...state,
        active: action.payload,
      };
    case SET_FORMTAB_ACTIVE:
      // return default json
      return {
        ...state,
        formtab: action.payload,
      };
    default:
      return state;
  }
}
