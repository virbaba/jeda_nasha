import React from "react";
import { Button } from "flowbite-react";
import './Footer.css'
const Footer = () => {
  return (
    <>
      <div className="footer-section" id="footer">
        <div className="footer-part-1">
          <h1>Let's Talk</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident officia vero consequatur? In, voluptatibus. Facere blanditiis incidunt molestiae est ex. Quod, rerum.</p>
          <Button className="footer-tell-us-btn">
            Tell us about your need
          </Button>
        </div>
        <div className="footer-part-2">
            <div className="footer-contact">
                <h2>
                    <span>
                        Email
                    </span>
                    <span>
                        kcribca28134@gmail.com
                    </span>
                </h2>
                <h2>
                    <span>
                        Phone
                    </span>
                    <span>
                        8955891038
                    </span>
                </h2>

                <h2>
                    <span>Address</span>
                    <p>1 Paya Lebar Link #04-01, Paya Lebar Quarter Tapukara 301707</p>
                </h2>
            </div>
            <div className="footer-contact-icon">
            <i className="ri-twitter-x-line"></i>
            <i className="ri-facebook-fill"></i>
            <i className="ri-instagram-line"></i>
            <i className="ri-linkedin-fill"></i>
            </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
