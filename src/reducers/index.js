import { combineReducers } from 'redux';
import CvReducer from './cvReducer';
import auth from "./authReducer";

import { reducer as formReducer} from 'redux-form'; //assign to alias FormReducer

const rootReducer = combineReducers({
  data: CvReducer,
  auth,
  form: formReducer
})

export default rootReducer;
