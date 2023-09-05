import React from "react";

const Contact = () => {
  return (
    <div className="contact_section layout_padding">
      <div className="container-fluid">
        <h1 className="what_taital">Contact us</h1>
        <p className="amet_text">
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore{" "}
        </p>
        <div className="contact_section2">
          <div className="row">
            <div className="col-md-6 padding_left_0">
              <div className="mail_section">
                <input
                  type=""
                  className="mail_text_1"
                  placeholder="Name"
                  name="Name"
                />
                <input
                  type=""
                  className="mail_text_1"
                  placeholder="Phone Number"
                  name="Phone Number"
                />
                <input
                  type=""
                  className="mail_text_1"
                  placeholder="Email"
                  name="Email"
                />
                <textarea
                  className="massage_text"
                  placeholder="Message"
                  rows={5}
                  id="comment"
                  name="Message"
                ></textarea>
                <div className="send_bt">
                  <a href="#">send</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 padding_0">
              <div className="map-responsive">
                <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29774.498959200657!2d79.0492069841919!3d21.120045342413743!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bff4342cd1e3%3A0x7d03e886f8e55189!2z4KSF4KSu4KS_4KSX4KWL4KSP4KS44KWN4KSk4KWH4KSa!5e0!3m2!1smr!2sin!4v1679636671732!5m2!1smr!2sin"
                  width="600"
                  height="400"
                  frameBorder={0}
                  style={{ border: 0, width: "100%" }}
                  allowFullScreen={undefined}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

