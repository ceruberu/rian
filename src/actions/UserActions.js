import {
  USER_REQUEST_CHECK_AUTH,
  USER_REQUEST_LOG_IN,
  USER_SUCCESS_LOG_IN,
  USER_FAIL_LOG_IN,
  USER_REQUEST_SIGN_UP,
  USER_SUCCESS_SIGN_UP,
  USER_FAIL_SIGN_UP,
  USER_LOG_OUT,
  USER_REQUEST_ADD_PROJECT,
  USER_SUCCESS_ADD_PROJECT,
  USER_FAIL_ADD_PROJECT
} from "../constants";
import axios from "axios";
import firebase from "firebase";
import firebaseConfig from "../../config/firebaseConfig";

/*----------  USER CHECK  ----------*/

export function userRequestCheckAuth() {
  return {
    type: USER_REQUEST_CHECK_AUTH,
    loading: true
  };
}

export function userCheckAuth() {
  return function(dispatch) {
    dispatch(userRequestCheckAuth());
    return axios
      .get("/api/checkAuth")
      .then(res => {
        dispatch(userLogIn(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(userFailSignUp());
      });
  };
}

/*----------  USER SIGN UP  ----------*/

export function userRequestSignUp() {
  return {
    type: USER_REQUEST_SIGN_UP,
    loading: true
  };
}

// export function userSuccessSignUp(res){
// 	return {
// 		type: USER_SUCCESS_SIGN_UP,
// 		loading: false
// 	}
// }

export function userFailSignUp(err) {
  return {
    type: USER_FAIL_SIGN_UP,
    loading: false
  };
}

export function userSignUp(form) {
  return function(dispatch) {
    dispatch(userRequestSignUp());
    return axios
      .post("/api/user/signUp", { form })
      .then(res => {
        dispatch(userLogIn(res.data));
      })
      .catch(err => {
        dispatch(userFailSignUp(err));
      });
  };
}

/*----------  USER LOG IN  ----------*/

export function userRequestLogIn() {
  return {
    type: USER_REQUEST_LOG_IN,
    loading: true
  };
}

export function userSuccessLogIn(data) {
  return {
    type: USER_SUCCESS_LOG_IN,
    loading: false,
    email: data.email,
    _id: data._id,
    facebook_id: data.facebook_id,
    picture: data.picture,
    token: data.token,
    name: data.name,
    projects: data.projects
  };
}

export function userFailLogIn() {
  return {
    type: USER_FAIL_LOG_IN,
    loading: false
  };
}

export function userLogIn(user) {
  return function(dispatch) {
    dispatch(userRequestLogIn());
    // user = coockie + passport : objectID
    return axios
      .post("/api/user/logIn", user)
      .then(res => {
        dispatch(userSuccessLogIn(res.data));
      })
      .catch(err => {
        dispatch(userFailLogIn(err));
      });
  };
}

export function userLogOut() {
  return {
    type: USER_LOG_OUT,
    _id: null,
    email: null,
    name: null,
    picture: null,
    token: null,
    loading: false,
    facebook_id: null,
    projects: []
  };
}

/*----------  USER ADD PROJECT  ----------*/

export function userRequestAddProject() {
  return {
    type: USER_REQUEST_ADD_PROJECT
  };
}

export function userSuccessAddProject(project) {
  return {
    type: USER_SUCCESS_ADD_PROJECT,
    projects: project
  };
}

export function UserFailAddProject() {
  return {
    type: USER_FAIL_ADD_PROJECT
  };
}

export function userAddProject(project) {
  return function(dispatch) {
    dispatch(userRequestAddProject());
    return axios
      .post("/api/project/newProject", { project })
      .then(res => {
        const { _id, name } = project;
        let newProject = { _id, name };
        dispatch(userSuccessAddProject(newProject));
      })
      .catch(err => {
        dispatch(UserFailAddProject(err));
      });
  };
}
