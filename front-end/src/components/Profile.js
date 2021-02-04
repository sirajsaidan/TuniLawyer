import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";

const Profil = () => {
  return (
    <div className="card-Law">
      <div className="card-body  ">
        <div className="row mx-3">
          <div className="card card-custom ">
            <div className="card-body d-flex">
              <div className=" col-8 justify-content-center p-2 d-flex">
                <img
                  style={{ width: "18rem" }}
                  className="card-img-top"
                  src="https://us.123rf.com/450wm/auremar/auremar1611/auremar161100195/65618037-portrait-of-male-and-female-lawyers-in-robes.jpg?ver=6"
                  alt="lawyer"
                />
                <div className="titlle-card d-flex-cloumn  ">
                  <h3 className="titlle-card p-3">
                    {" "}
                    Law Offices Of Albert L. Crosner
                  </h3>
                  <div className="ml-3">
                    <StarRatingComponent
                      className="star"
                      name="rate1"
                      starCount={5}
                      emptyStarColor={"#010807"}
                    />
                    <div className="mb-2">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={
                          "Big belly rude boy, million dollar hustler. Unemployed."
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profil;
