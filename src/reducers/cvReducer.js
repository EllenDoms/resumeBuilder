import { FETCH_SUCCESS, FETCH_LOADING, FETCH_NOTFOUND, SET_RESUME_ACTIVE, ADD_NEW_RESUME, DELETE_RESUME, SAVING_RESUME, SAVED_RESUME, SET_FORMTAB_ACTIVE } from '../actions/types';
import _ from 'lodash';

const initialState = {
  active: '',
  resumes: {},
  loading: true,
  notFound: '',
  formtab: 'template',
  status: ''
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
      return {
        ...state,
        resumes: action.payload,
        loading: false
      };
    case SET_RESUME_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case ADD_NEW_RESUME:
      return {
        ...state,
        active: action.key,
        resumes: {...state.resumes, [action.key]: action.resume }
      };
    case DELETE_RESUME:
      return {
        ...state,
        resumes : { ...state.resumes, [action.key] : { "status" : "inactive" } }
      }
    case SAVING_RESUME:
      return {
        ...state,
        status: 'Saving...'
      }
      case SAVED_RESUME:
        return {
          ...state,
          status: `Last saved at ${action.payload}`
        }
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
