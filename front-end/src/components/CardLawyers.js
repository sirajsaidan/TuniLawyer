import React, { useState, useEffect } from 'react';
import { Card, Button } from "react-bootstrap";
import StarRatingComponent from 'react-star-rating-component'
import '../tab.css'
import ReadMoreReact from 'read-more-react';
import { Link } from "react-router-dom";


const Lawyers = () => {
        
        return (

                  <div className="card-Law">
       
       
      <div className="card-body  ">
      <div className="row mx-3">
      <div className="card card-custom ">
                <div className="card-body d-flex"> 
                <div className =" col-3p-2">
                <img  style={{width: '18rem'}} className="card-img-top" src="https://us.123rf.com/450wm/auremar/auremar1611/auremar161100195/65618037-portrait-of-male-and-female-lawyers-in-robes.jpg?ver=6" alt="lawyer" />
</div>
<div className="col-6">
<div className=" col-12 d-flex flex-column">
  <div className="p-2"> 
   <h3 className="titlle-card"> Law Offices Of Albert L. Crosner</h3>
  <div className="titlle-card ">
      < StarRatingComponent
            className="star"
            name="rate1"
            starCount={5}
            
            emptyStarColor={"#010807"}
           
          />
          </div>
  </div>
  
                  
                    
  <div className="body">
  <p>Hi My law office, Law Offices of Albert Crosner is located in Manhattan Beach,
     CA.  My office phone number is 310-318-5883, cell is 310-780-0863e</p>
  <details>
    <summary>
      <span id="open">Read more</span> 
      <span id="close">Close</span> 
    </summary>
    <p>
    and my email is crosnerlaw@gmail.com.  I have provided legal assistance for the last 42 years to many clients who needed legal help. If you are looking for a personal injury attorney who specializes in car, truck, ATV, motorcycle, bus, or pedestrian accident cases who will fight hard for you against the insurance companies, I will do that and will keep in contact with you. Reflecting that, I have received numerous reviews in AVVO.com, Thumbtacks, and YELP.  I also offer a free     </p>
  </details>
</div>
                </div>



                </div>
                <div className="col-3 " >
               <div className="content-button hidden-xs d-flex flex-column">

  <button className="btn btn-blue btn-xl get-started" data-service-id="591b6ffe38a5fa7a40d4a60e">Request a quote</button>
  <a href="/pa/philadelphia/attorneys/olen-law-office" className="btn btn-backlead btn-xl hidden-xs">View Profile</a>
</div>



                </div>
                </div>
     </div>
      </div>
      
      </div>
      </div>
     


        )
        }
        export default Lawyers