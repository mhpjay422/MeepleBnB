import React from "react";
import ListingsIndexContainer from "../listings/listing_index_container";
import SplashContainer from "../splash_page/splash_container";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar_container";
import Footer from "../footer/footer_index_frame.jsx"

export default ({ users, logout, loggedIn, demoLogin, openModal }) => {

  const linkToSessions = () => {
    return (
      <>
        <Navbar />
        <div className="body-content">
          <ListingsIndexContainer />
        </div>
        <Footer/>
      </>
    );
  };

  return linkToSessions();
};

// <div>Dates</div>
// <div>Guests</div>
// <div>Price</div>
