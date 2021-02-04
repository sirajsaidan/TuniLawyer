import React from 'react'
import { Link } from "react-router-dom";

import './Popular.css'
const Pop =()=>{
    return(

        <div>       
                 <h1 className="Populartitel">Popular Legal</h1>
                <div className="row justify-content-center mt-5 mt-xl-5-md-5-sm-n5">
                <div className="col-sm-3">
        <div className="card  " style={{width: '18rem'}}>
 
    <Link  to="/Lawyers">
    <img className="card-img-top" src="https://us.123rf.com/450wm/auremar/auremar1611/auremar161100195/65618037-portrait-of-male-and-female-lawyers-in-robes.jpg?ver=6" alt="lawyer" />
    <h5 className="card-title">Lawyers</h5>
</Link>
    </div>
    </div>
    <div className="col-sm-3">
        <div className="card  " style={{width: '18rem'}}>
  <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEKmEmRQk4J4moRhs79Gl433194siDJcVL_Q&usqp=CAU" alt="Attornyas" />
    <h5 className="card-title">Attornyas</h5>
    </div>
    </div>
    <div className="col-sm-3">
        <div className="card  " style={{width: '18rem'}}>
  <img className="card-img-top" src="data:image/jpeg;base64,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" alt="lawyer" />
    <h5 className="card-title">Divorce Lawyers</h5>
    </div>
    </div>
    
   
</div>
<div className="row justify-content-center mt-5 mt-xl-5-md-5-sm-n5">
                <div className="col-sm-3">
        <div className="card  " style={{width: '18rem'}}>
  <img className="card-img-top" src="https://lh3.googleusercontent.com/proxy/yX-0a70N_q0i_2C2evnNMY5kzsgltHNgHgxrtJe8235t5Pn12jFKhsuNC_lix_DVV1nwTmp5dwsfvPFlJUEzvSeg82mfXjtxbus-uHg0HkMmi7reIiR5z9Cg8sAY-V4" alt="lawyer" />
    <h5 className="card-title">DU & Dwi Lawyers</h5>
    </div>
    </div>
    <div className="col-sm-3">
        <div className="card  " style={{width: '18rem'}}>
  <img className="card-img-top" src="https://www.britanniasolicitors.com/assets/img/single-practice/b2.jpg" alt="lawyer" />
    <h5 className="card-title">immigration Lawyers</h5>
    </div>
    </div>
    <div className="col-sm-3">
        <div className="card  " style={{width: '18rem'}}>
  <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSXEWGKJ8xTBafj0E47lmt8op03AY5I3c5I5Q&usqp=CAU" alt="lawyer" />
    <h5 className="card-title">bankruptcy lawyers</h5>
    </div>
    </div>
    
   
</div>
<div className="row justify-content-center mt-5 mt-xl-5-md-5-sm-n5">
                <div className="col-sm-3">
        <div className="card  " style={{width: '18rem'}}>
  <img className="card-img-top" src="https://lawyerrepair.com/wp-content/uploads/2019/11/Real-Estate-Lawyer.jpg" alt="lawyer" />
    <h5 className="card-title">Real Estate Lawyers</h5>
    </div>
    </div>
    <div className="col-sm-3">
        <div className="card  " style={{width: '18rem'}}>
  <img className="card-img-top" src="https://www.lawryresearch.com/wp-content/uploads/2020/05/Attorney-Can-Help-with-Your-Car-Accident-Claim.jpg" alt="lawyer" />
    <h5 className="card-title">car accident Lawyers</h5>
    </div>
    </div>
    <div className="col-sm-3 ">
        <div className="card  " style={{width: '18rem'}}>
  <img className="card-img-top" src="https://d11upr8lrcn9x7.cloudfront.net/www.mehaliclaw.com/s3fs-public/couple-reviewing-loan-document_0.jpg" alt="lawyer" />
    <h5 className="card-title">consumer law attorneys</h5>
    </div>
    </div>
    
</div>
</div>

    )
}
export default Pop ;