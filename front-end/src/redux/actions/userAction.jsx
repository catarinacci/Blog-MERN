import {
  USER_LOAD_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";

import axios from 'axios';
import {toast} from "react-toastify";

// sing up action
export const userSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const { data } = await axios.post("api/signin", user);
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      pyload: data,
    });
    toast.success("Register Successfully!");
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      pyload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

//sing in action
export const userSignInAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  console.log(user,"dispach")
  try {
    console.log(user,"dispach")

    const { data } = await axios.post("http://localhost:9000/api/signin", user);

    console.log(data,'data axios')
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      pyload: data,
    });
    toast.success("Log In Successfully!");
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      pyload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

//user profile action
export const userProfileAction = (user) => async (dispatch) => {
  console.log('user action 111')
  console.log(user,'user action')
  dispatch({ type: USER_LOAD_REQUEST });
  try {
    const { data } = await axios.get("http://localhost:9000/api/me",user);
    console.log(data, 'data action')
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

//log out action
export const userLogoutAction = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    localStorage.removeItem("userInfo");
    const { data } = await axios.get("http://localhost:9000/api/logout");
    dispatch({
      type: USER_LOGOUT_SUCCESS,
      payload: data,
    });
    toast.success("Log out successfully!");
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};
