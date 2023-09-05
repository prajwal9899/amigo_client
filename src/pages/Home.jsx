import React, { useEffect } from "react";
import banner from "../assets/banner-img.png";
import About from "./About";
import Project from "./Project";
import Services from "./Services";

const Home = () => {

  return (
    <div>
      <div className="header_section">
        <div className="header_left">
          <div className="banner_main">
            <h1 className="banner_taital">
              financial <br />
              Service
            </h1>
            <p className="banner_text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever
            </p>
            <div className="btn_main">
              <div className="more_bt">
                <a href="#">Read More </a>
              </div>
              <div className="contact_bt">
                <a href="#">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
        <div className="header_right">
          <img src={banner} className="banner_img" />
        </div>
      </div>
      <About />
      <Services />
      <Project />
    </div>
  );
};

export default Home;
