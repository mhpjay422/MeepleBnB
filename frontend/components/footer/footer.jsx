import React from "react";

export default ({}) => {

  const footer = () => {
    return (
        <>  
          <div className="footer-left">
            © 2020 Meeplebnb, Inc. All rights reserved
          </div>
          <div className="footer-right">
            <a className="personal-site" href="http://jasonmgong.com/">
              <div className="personal-div"> Personal Site</div>
            </a>
            <a className="linkedIn-link" href="https://www.linkedin.com/in/jason-gong-79772b126/">
              <img className="linkedin-img" src="linkedinn.png"></img>
            </a>
            <a className="github-link" href="https://github.com/mhpjay422">
              <img className="github-img" src="github.png"></img>
            </a>
          </div>
        </> 
    )
  }

  return footer();
}