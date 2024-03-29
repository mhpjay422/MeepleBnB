import React from "react";

export default ({}) => {
  const footer = () => {
    return (
      <>
        <div className="footer-left">
          © 2020 Meeplebnb, Inc. All rights reserved
        </div>
        <div className="footer-right">
          <a
            className="linkedIn-link"
            href="https://www.linkedin.com/in/jason-gong-79772b126/"
          >
            <img className="linkedin-img" src="linked.png"></img>
          </a>
          <a className="github-link" href="https://github.com/mhpjay422">
            <img className="github-img" src="github2.png"></img>
          </a>
        </div>
      </>
    );
  };

  return footer();
};
