import {
  REGISTER__SUCCESS,
  REGISTER__FAIL,
  LOGIN__SUCCESS,
  LOGIN__FAIL,
  LOAD_USER,
  LOAD_USER_FAIL,
  DISCONNECT,
} from "../actions/types";

let initState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem('role'),
  user: null,
  isAuth: !!localStorage.getItem("token"),
  error: null,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER__SUCCESS:
    case LOGIN__SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        error: null,
        role: action.payload.role
      };
    case DISCONNECT:
      return {
        ...state,
        token: null,
        isAuth: false,
        error: null,
        role: null
      }
    case REGISTER__FAIL:
    case LOGIN__FAIL:
    case LOAD_USER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        error: action.payload,
        isAuth: false,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
