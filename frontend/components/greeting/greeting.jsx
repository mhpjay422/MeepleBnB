import React from "react";
import ListingsIndexContainer from "../listings/listing_index_container";
import SplashContainer from "../splash_page/splash_container";
import { Link } from "react-router-dom";
import Navbar from "../navbar/navbar_container";
import Footer from "../footer/footer_show_frame.jsx"

export default ({ users, logout, loggedIn, demoLogin, openModal }) => {

  const linkToSessions = () => {
    return (
      <nav>
        <Navbar />
        <div className="body-content">
          <ListingsIndexContainer />
        </div>
        <Footer/>
      </nav>
    );
  };

  return linkToSessions();
};

// <div>Dates</div>
// <div>Guests</div>
// <div>Price</div>
