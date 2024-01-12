import React from "react";
import Footer from "./footer";

export default ({ }) => {

  const footerFrame = () => {
    return (
      <div className="footer-container">
        <div className="footer-index-frame">
          <Footer />
        </div>
      </div>
    )
  }

  return footerFrame();
}