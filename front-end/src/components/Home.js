import React, { useState } from "react";
import "./home.css"
import Formulaire from './Formulaire.js'
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../actions/actions";
import { useHistory } from 'react-router-dom';


const Home = () => {
  const history = useHistory();
  const [zipCode, setZipCode] = useState('');
  const handleZipCode = ({ target: { value } }) => setZipCode(value);
  const handleForm = (e) => {
    e.preventDefault();
    e.target.className += 'was-validated';
    if (zipCode && zipCode.length) {
      history.push(`/list?zipCode=${zipCode}`);
    }
  }
  const dispatch = useDispatch();
  /*   useEffect(() => {
      dispatch(loadUser())
      // eslint-disable-next-line
    }, []); */
  return (
    <div className="bg-home"  >
      <div className="col">
        <div className="row">
          <div className="col">
            <div className="hero__caption">
              <p>Professional lawyers</p>
              <h1>We will fight<br />
              for you like a friend </h1>

            </div>
            <div className="row d-flex justify-content-center ">
              <div className="search">
                <h1> Find trusted pros and get the help you need. </h1>

                <ul className="form_in d-flex justify-content-center mt-3">
                  <il>
                    <form action="" noValidate onSubmit={handleForm}>
                      <div className="form-group row">
                        <div className="col-8 px-0">
                          <input type="text" class="form-control" name="Code Postal" placeholder="Code Postal" value={zipCode} onChange={handleZipCode}></input>
                        </div>
                        <div className="col-4 px-0">
                          <button className="btn btn-primary" disabled={!zipCode.length}>Go</button>
                        </div>
                      </div>
                    </form>
                  </il>
                </ul>

              </div>
            </div>
          </div>



        </div>

      </div>
    </div>
    




  )
}
export default Home;