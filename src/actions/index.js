import { FETCH_USER, FETCH_LOADING, FETCH_NOTFOUND, FETCH_SUCCESS, SET_RESUME_ACTIVE, ADD_NEW_RESUME, DELETE_RESUME, SET_FORMTAB_ACTIVE } from './types';
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

export function setActiveResume(bool, key) {
  return {
    type: SET_RESUME_ACTIVE,
    loading: bool,
    payload: key
  }
}

export function setActiveFormtab(tab) {
  return {
    type: SET_FORMTAB_ACTIVE,
    payload: tab
  }
}

export const fetchUserResumes = uid => async dispatch => {
  databaseRef.orderByChild("user").equalTo(uid)
  .once('value', snap => {
    dispatch(fetchSuccess(false, snap.val() ));
  })
}

export const newResume = (bool, values) => async dispatch => {
  return firebase.database().ref('resumes/').push(values)
    .then((snap) => {
      console.log(snap)
      let key = snap.key;
     dispatch({
       type: ADD_NEW_RESUME,
       loading: bool,
       key: key,
       resume: values
     })
   })
}

export const deleteResume = key => async dispatch => {
  console.log('Deleting resume');
  // SOFT DELETE?!
  // console.log(key)
  // return firebase.database().ref('resumes/').child(key).remove()
  //   .then((snap) => {
  //     console.log(snap)
  //     let key = snap.key;
  //     dispatch({
  //       type: DELETE_RESUME,
  //       key: key
  //     })
  //   })
}

export const postResumeValue = (values, key) => async dispatch => {
  console.log('Posting resume')
  return firebase.database().ref(`resumes/${key}`).set(values)
}


/*** PUBLIC RESUME PAGE ***/
export const fetchResume = (key) => async dispatch => {
  dispatch(fetchLoading(true))
  const url = config.databaseURL + `resumes/${key}/` + config.auth;
  return axios.get(url)
  .then(data => {
    console.log(data.data)
    if(!data) {
      dispatch(fetchNotFound(true))
    } else {
      dispatch(fetchSuccess(false, data.data, key));
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

export const signOut = () => dispatch => {
  console.log('signOut')
  authRef
    .signOut()
    .then(() => {
      this.context.router.history.push("/");
    })
    .catch(error => {
      console.log(error);
    });
};
