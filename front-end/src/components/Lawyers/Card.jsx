import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import HTMLReactParser from 'html-react-parser';
import Truncate from 'react-truncate';

const Card = ({ info }) => {
  const [lines, setLines] = useState(3);
  const toggleReadMore = () => {
    setLines(lines === 3 ? Number.MAX_SAFE_INTEGER : 3);
  }
  return <div className="">
    <div className="card-law">
      <div className="row mx-3">
        <div className="card card-custom">
          <div className="card-body d-flex">
            <div className=" col-3p-2">
              <img style={{ width: '18rem' }} className="card-img-top" src="https://us.123rf.com/450wm/auremar/auremar1611/auremar161100195/65618037-portrait-of-male-and-female-lawyers-in-robes.jpg?ver=6" alt="lawyer" />
            </div>
            <div className="col-6">
              <div className=" col-12 d-flex flex-column">
                <div className="p-2">
                  <h3 className="titlle-card"> {info.firstName}{info.lastName}</h3>
                  <div className="titlle-card ">
                    < StarRatingComponent
                      name="star"
                      starCount={5}
                      value={info.star}

                      emptyStarColor={"yellow"}

                    />
                  </div>

                </div>



                <div className="body">
                  <p><Truncate lines={lines}>{HTMLReactParser(info.description)}</Truncate></p>
                  <details>
                    <summary>
                      {lines === 3 ? <span onClick={toggleReadMore}>Read more</span> : <span onClick={toggleReadMore}>Close</span>}
                    </summary>
                  </details>
                </div>
              </div>



            </div>
            <div className="col-4 " >
              <div className="content-button hidden-xs d-flex flex-column">

                <button className="btn btn-blue btn-xl get-started" data-service-id="591b6ffe38a5fa7a40d4a60e">Request a quote</button>
                <a href="/pa/philadelphia/attorneys/olen-law-office" className="btn btn-backlead btn-xl hidden-xs">View Profile</a>
                <div className="title-card">
                  <div className="row">
                    <div className="col-12">Mail:{info.email}</div>
                    <div className="col-12">Phone:{info.phone}</div>
                    <div className="col-12">Zip Code:{info.zipCode}</div>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Card;