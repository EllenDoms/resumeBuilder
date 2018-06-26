import { FETCH_USER, SIGNIN_ERROR, FETCH_LOADING, FETCH_NOTFOUND, FETCH_SUCCESS, SET_RESUME_ACTIVE, ADD_NEW_RESUME, DELETE_RESUME, SAVING_RESUME, SAVED_RESUME, SET_FORMTAB_ACTIVE } from './types';
import { config, authRef, databaseRef, provider } from "../config/firebase";
import * as firebase from "firebase";
import history from '../components/auth/history';
import { SubmissionError } from 'redux-form';

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
    console.log(snap.val())
    if(!snap.val()) {
      dispatch(fetchSuccess(false, "" ));
    } else {
      dispatch(fetchSuccess(false, snap.val() ));
    }

  })
}

export const newResume = (bool, values) => async dispatch => {
  return firebase.database().ref('resumes/').push(values)
    .then((snap) => {
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
  console.log('saving')
  dispatch({ type: SAVING_RESUME });
  firebase.database().ref(`resumes/${key}`)
  .set(values)
  .then(data => {
    console.log('saved')
    setTimeout(() => {
      dispatch({ type: SAVED_RESUME })
    }, 200)

  })

}


/*** PUBLIC RESUME PAGE ***/
export const fetchResume = (key) => async dispatch => {
  dispatch(fetchLoading(true))
  const url = config.databaseURL + `resumes/${key}/` + config.auth;
  return axios.get(url)
  .then(data => {
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

export const signUpPass = (values) => dispatch => {
  const email = values.email;
  const pass = values.password;
  authRef
  .createUserWithEmailAndPassword(email, pass)
  .catch(function(error) {
    console.log(error.message);
    dispatch({
      type: SIGNIN_ERROR,
      payload: error.message
    })
  });
}

export const signIn = (values) => dispatch => {
  const email = values.email;
  const pass = values.password;
  if(email && pass) {
    console.log("with pass")
    authRef
    .signInWithEmailAndPassword(email, pass)
    .then(result => {
      console.log("done!")
      history.push('/user')
    })
    .catch(function(error) {
      console.log(error.message);
      dispatch({
        type: SIGNIN_ERROR,
        payload: error.message
      })
    });
  } else {
    authRef
      .signInWithPopup(provider)
      .then(result => {
        console.log("done!")
        history.push('/user')

      })
      .catch(error => {
        console.log(error);
      });
  }
};

export const signInForgot = (email) => dispatch => {
  console.log(email)
  authRef
  .sendPasswordResetEmail(email)
  .then(function() {
    console.log('email send')
  }).catch(function(error) {
    console.log(error)
  });
}

export const signOut = () => dispatch => {
  authRef
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      console.log(error);
    });
};
