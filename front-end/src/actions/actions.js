import {
    REGISTER__SUCCESS,
    REGISTER__FAIL,
    LOGIN__SUCCESS,
    LOGIN__FAIL,
    LOAD_USER,
    LOAD_USER_FAIL,
    DISCONNECT
  } from "./types";
  import axios from "axios";
  import setHeaderToken from "../setHeaderToken";
  
  export const disconnect = (dispatch)=>{
    dispatch({type:DISCONNECT})
  }
  // REGISTER
  export const register = (info) => (dispatch) => {
    axios
      .post("/register", info)
      .then((res) =>
        dispatch({
          type: REGISTER__SUCCESS,
          payload: res.data.token,
        })
      )
      .catch((err) =>
        dispatch({
          type: REGISTER__FAIL,
          payload: err.response.data.errors,
        })
      );
  };
  
  // LOGIN
  export const login = (info) => (dispatch) => {
    console.log(info);
    axios
      .post("/login", info)
      .then((res) =>
        dispatch({
          type: LOGIN__SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: LOGIN__FAIL,
          payload: "login err",
        })
      );
  };
  
  // LOAD USER
  export const loadUser = () => (dispatch) => {
    setHeaderToken();
    axios
      .get("/login")
      .then((res) =>
        dispatch({
          type: LOAD_USER,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: LOAD_USER_FAIL,
          payload: err.response.data.errors,
        })
      );
  };
  
  // CREATE POST
  