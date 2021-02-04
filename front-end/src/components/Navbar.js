import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import "./Navbar.css"
import { disconnect } from '../actions/actions'


const navbar = ({ role, isAuth, disconnect }) => {
  return (
    <header className="navbar navbar-expand-md navbar-dark">
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu">
          <span className="navbar-toggler-icon" />
        </button>
        <Link to="/" className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pr-0 pr-md-3">
          Tunilawyer
    </Link>

        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">

            <div className="ml-md-auto pl-md-4 py-2 py-md-0 mr-md-4 order-first order-md-last flex-grow-1 flex-md-grow-0">
              <ul className="navbar-nav">
                <li className="nav-item ">
                  <Link className="nav-link" to="/Profil"></Link>


                </li>
                {role === 'ADMIN' && <li className="nav-item">
                  <Link className="nav-link" to="/list"><a className="hover">List</a></Link>


                </li>}
                <li className="nav-item">
                  <Link className="nav-link" to="/"><a className="hover">Home</a></Link>


                </li>
                {!role && <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login"><a className="hover">Login</a></Link>

                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register"><a className="hover">register</a></Link>

                  </li>
                </>}


              </ul>
            </div>
          </div>
        </div>
        {role && <div>
          <button className="btn btn-primary" onClick={disconnect}>Log out</button>
        </div>}
      </div>
    </header>

  );
};
const mapStateToProps = (state) => ({
  role: state.auth.role,
  isAuth: state.auth.isAuth
})
const mapDispatchToProps = (dispatch) => ({
  disconnect: () => dispatch(disconnect)
})

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
