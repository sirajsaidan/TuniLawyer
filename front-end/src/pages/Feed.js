import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../actions/actions";

const Feed = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return auth.user ? (
    <div>
      <h1>{auth.user.fname}</h1>
      <h1>{auth.user.lname}</h1>
      <h1>{auth.user.email}</h1>
    </div>
  ) : (
    <h1>LOADING...</h1>
  );
};

export default Feed;
