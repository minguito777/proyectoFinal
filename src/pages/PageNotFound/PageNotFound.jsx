import React from "react";
import "./StylesPageNotFound.css";
import error404 from "../../assets/img/404/404.png";

function PageNotFound() {
  return (
    <div className="container not-found-container ">
      <div className="not-found-img">
        <img src={error404} alt="404" />
      </div>
      <p>Page not found</p>
    </div>
  );
}

export default PageNotFound;
