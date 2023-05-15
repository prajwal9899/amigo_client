import React from "react";
import fb from "../assets/fb-icon.png";
import twitter from "../assets/twitter-icon.png";
import linked from "../assets/linkedin-icon.png";
import personImg from "../assets/img-7.png";

// import person1 from '../assets/'
const Team = () => {
  let person = [1, 2, 3, 4];
  return (
    <div className="team_section layout_padding">
      <div className="container">
        <h1 className="what_taital">Our Team and experts</h1>
        <p className="what_text_1">
          It is a long established fact that a reader will be distracted by the
          readable content of a{" "}
        </p>
        <div className="team_section_2 layout_padding">
          <div className="row">
            {person.map(() => {
              return (
                <div className="col-sm-3">
                  <img src={personImg} className="image_7" />
                  <p className="readable_text">Readable</p>
                  <p className="readable_text_1">Follow Us</p>
                  <div className="social_icon">
                    <ul>
                      <li>
                        <a href="#">
                          <img src={fb} />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={twitter} />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <img src={linked} />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
