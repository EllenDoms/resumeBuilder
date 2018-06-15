import { FETCH_USER, FETCH_LOADING, FETCH_NOTFOUND, FETCH_SUCCESS, SET_RESUME_ACTIVE, SET_FORMTAB_ACTIVE,POST_RESUME } from './types';
import { config, authRef, databaseRef, provider } from "../config/firebase";
import * as firebase from "firebase";

import axios from 'axios';

function fetchLoading(bool, data) {
  return {
      type: FETCH_LOADING,
      loading: bool,
  };
}

function fetchNotFound(bool) {
  return {
      type: FETCH_NOTFOUND,
      notFound: bool,
  };
}

function fetchSuccess(bool, resumes) {
  return {
      type: FETCH_SUCCESS,
      loading: bool,
      payload : resumes
  }
}

export function setActiveResume(bool, id) {
  return {
    type: SET_RESUME_ACTIVE,
    loading: bool,
    payload: id
  }
}

export function setActiveFormtab(tab) {
  return {
    type: SET_FORMTAB_ACTIVE,
    payload: tab
  }
}

function checkData(data) {
  //count characters in paragraph
  let characters = 0;
  data.intro.content.map(paragraph => { return characters = characters + paragraph.length });
  //check if input is ok
  return true;
   if (
     //min one entry everywhere
     data.experience.length > 0 && data.education.length > 0 && data.skills.length > 0 && data.expertise.length > 0 && data.intro.title.length > 0 && data.intro.content.length > 0 && data.personality.length > 0 && data.passions.length > 0 &&
     // max timeline
     data.experience.length + data.education.length < 7 &&
     // amount of characters for intro text
     characters < 801 && characters > 449 &&
     // max skills + Expertise
     data.skills.length/2 + data.expertise.length < 11 &&
     // max why paragraph
     data.intro.content.length < 5 &&
     // max personality and Passions
     data.personality.length < 10 && data.passions.length < 11
   ){
     return true;
   } else {
     return false;
   }
}

export const fetchUserResumes = uid => async dispatch => {
  databaseRef.orderByChild("user").equalTo(uid)
  .once('value', snap => {
    dispatch(fetchSuccess(false, snap.val() ));
  })
}

export const postResumeValue = (values, id) => async dispatch => {
  console.log('posting resume')
  return firebase.database().ref(`resumes/${id}`).set(values)
}


/*** PUBLIC RESUME PAGE ***/
export const fetchResume = (id) => async dispatch => {
  dispatch(fetchLoading(true))
  const url = config.databaseURL + `resumes/${id}/` + config.auth;
  return axios.get(url)
  .then(data => {
    console.log(data.data)
    if(!data) {
      dispatch(fetchNotFound(true))
    } else {
      dispatch(fetchSuccess(false, data.data, id));
    }
  })
  .catch(error => console.log('BAD', error))
}

/*** AUTHENTICATION ***/
export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      })
    }
  })
};

export const signIn = () => dispatch => {
  authRef
    .signInWithPopup(provider)
    .then(result => {})
    .catch(error => {
      console.log(error);
    });
};

// export const signOut = () => dispatch => {
//   authRef
//     .signOut()
//     .then(() => {
//       this.context.router.history.push("/");
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };
