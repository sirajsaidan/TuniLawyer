import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, login } from "../actions/actions";
import '../tab.css'
import {withRouter} from 'react-router-dom'

const Login = ({ history }) => {
  const [info, setInfo] = useState({
    password: "",
    email: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isAuth) { 
      history.push("/");
    }
  }, [auth.isAuth]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex-fill d-flex flex-column justify-content-center">
  <div className="container-tight py-6">
    
    <form className="card card-md" action="." method="get"  onSubmit={(e) => {
      e.preventDefault()
          dispatch(login(info));
        }}>
      <div className="card-body">
        <h2 className="mb-5 text-center">Login to your account</h2>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          
          <input
        type="email" className="form-control" placeholder="Enter email" autoComplete="off" 
        name="email"
        onChange={handleChange}
      />
        </div>
        <div className="mb-2">
          <label className="form-label">
            Password
            <span className="form-label-description">
              <a href="./forgot-password.html">I forgot password</a>
            </span>
          </label>
          <div className="input-group input-group-flat">
          <input
       type="password" className="form-control" placeholder="Password"
        name="password"
        onChange={handleChange}
      />
            <span className="input-group-text">
              <a href="#" className="link-secondary" title data-toggle="tooltip" data-original-title="Show password"><svg xmlns="http://www.w3.org/2000/svg" className="icon" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" /><circle cx={12} cy={12} r={2} /><path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" /><path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" /></svg>
              </a>
            </span>
          </div>
        </div>
        
        <div className="form-footer">
          <button type="submit" className="btn btn-primary btn-block">Sign in</button>
        </div>
      </div>
     
      
    </form>
    <div className="text-center text-muted">
      Don't have account yet? <a href="./sign-up.html" tabIndex={-1}>Sign up</a>
    </div>
  </div>
</div>

  );
};

export default  withRouter (Login);
