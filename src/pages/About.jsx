import React from "react";
import image1 from '../assets/img-1.png'

const About = () => {
  return (
    <div className="services_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="services_taital">WELCOME TO FINAnCIAL SERVICES</h1>
            <p className="services_text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it{" "}
            </p>
            <div className="moremore_bt">
              <a href="#">Read More </a>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <img src={image1} className="image_1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
