import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/actions";
import "./register.css"
import SimpleSchema from 'simpl-schema';
import axios from 'axios'
import cx from 'classnames'
import {withRouter} from 'react-router-dom'
import { REGISTER__SUCCESS } from "../actions/types";

const validationSchema=new SimpleSchema({
  firstName:{type:String,min:2,max:20},
  lastName:{type:String,min:2,max:20},
  email:{type:String,regEx:SimpleSchema.RegEx.Email},
  password:{type:String,min: 5,
    max: 20,},
    phone:{type:String,regEx:SimpleSchema.RegEx.Phone},
    address:{type:String,min:2,required:false},
    cin:{type:String,min:6},
    sex:{type:Boolean,required:false}
}) 
const Register = ({ history }) => {
  const [info, setInfo] = useState({
    firstName: "",
    làastName: "",
    email: "",
    password: "",
    confirmpassword:"",
    phone:"",
    address:"",
    cin:"",
    sex: "",
  });
  const[error,setError]=useState({

  })
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.isAuth) {
      history.push("/Home");
    }
  }, [auth.isAuth]);
  const handleChange = (e) => {
    console.log(typeof e.target.value)
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
const onSubmit=(e)=>{

  e.preventDefault()
  e.target.className+="was-validated";
  let errors ={

  }
  const{
    firstName,
    lastName,
    email,
    password,
    confirmpassword,
    phone,
    address,
    cin,
    sex
  }=info
  if(password !== confirmpassword){
errors.password="not same password"
  }
  try {
    validationSchema.validate( {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      cin,
      sex
      

    } )
  } catch (error) {
    for (let i = 0; i < error.details.length; i++)
      errors[error.details[i].name] = error.details[i].message;

    
  }
  setError(errors)
  if(!Object.values(errors).length){
    axios.post('http://localhost:5003/register', {
      firstName,
        lastName,
        email,
        password,
        phone,
        cin
    })
    .then(function ({data}) {
      dispatch({type:REGISTER__SUCCESS,payload:data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
  return (
    <div className="container register">
      <form onSubmit={onSubmit} noValidate>

  <div className="row justify-content-center">
    
    <div className="col-md-9 register-right">
      <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
        <li className="nav-item">
        </li>
        <li className="nav-item">
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <h3 className="register-heading">WELCOM</h3>
          <div className="row register-form">
            <div className="col-md-6">
              <div className="form-group">
                
              <input  className={cx("form-control",{'is-invalid':!!error.firstName})}
        type="text"
        placeholder="firstName"
        onChange={handleChange}
        name="firstName"
        value={info.firstName}

      />
       <div className="invalid-feedback">{error['firstName']}</div>
       
                    </div>
              <div className="form-group">
              <input  className={cx("form-control",{'is-invalid':!!error.lastName})}
        type="text"
        placeholder="lastName"
        onChange={handleChange}
        name="lastName"
        value={info.lastName}
      />              
      <div className="invalid-feedback">{error['lastName']}</div>
      </div>
              <div className="form-group">
              <input  className={cx("form-control",{'is-invalid':!!error.password})}
              value={info.password}
        type="password"
        placeholder="password"
        onChange={handleChange}
        name="password"
      />
            <div className="invalid-feedback">{error['password']}</div>
              
       </div>
              <div className="form-group">
              <input  className={cx("form-control",{'is-invalid':!!error.confirmPassword})}
        type="password"
        placeholder="Confirmer password"
        onChange={handleChange}
        name="confirmpassword"
        value={info.confirmpassword}
      />   
             <div className="invalid-feedback">{error['confirmPassword']}</div>
          
      
       </div>
              <div className="form-group">
              <div>
  <div className="form-check form-check-inline">
    <input className={cx("form-check-input",{'is-invalid':!!error.sex})} onChange={()=>setInfo({...info,sex:true})}  type="radio" name="sex" id="inlineRadio1" value={true} />

    <label className="form-check-label" htmlFor="inlineRadio1">male</label>

  </div>
  <div className="form-check form-check-inline">
    <input onChange={()=>setInfo({...info,sex:true})} className={cx("form-check-input",{'is-invalid':!!error.sex})} type="radio" name="sex" id="inlineRadio2" value={false}  />

    <label className="form-check-label" htmlFor="inlineRadio2">femme</label>

  </div>
  <div className="invalid-feedback">{error['sex']}</div>

</div>

              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
              <input className={cx("form-control",{'is-invalid':!!error.email})}
        type="text"
        placeholder="email"
        onChange={handleChange}
        name="email"
        value={info.Email}
      />     
          <div className="invalid-feedback">{error['email']}</div>
         </div>
              <div className="form-group">
                <input  onChange={handleChange} type="phone" value={info.phone} name="phone" className={cx("form-control",{'is-invalid':!!error.phone})} placeholder="Your Phone "  />
                <div className="invalid-feedback">{error['phone']}</div>

              </div>

              <div className="form-group">
                <input type="text" className={cx("form-control",{'is-invalid':!!error.cin})} name="cin" placeholder="CIN"  onChange={handleChange} value={info.cin} />
                <div className="invalid-feedback">{error['cin']}</div>

              </div>
              <div className="form-group">
                <input type="text" className={cx("form-control",{'is-invalid':!!error.address})} name="address" placeholder="address"  onChange={handleChange} value={info.address} />
                <div className="invalid-feedback">{error['address']}</div>

              </div>
              <button   type="submit" className="btnRegister"> register </button>
            </div>
          </div>
        </div>
        
            </div>

          </div>
        </div>
        </form>
      </div>
  
  

  );
};

export default  withRouter(Register);
