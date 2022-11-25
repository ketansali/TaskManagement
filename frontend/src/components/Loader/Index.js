import React from "react";

const Loader = () => {
  return (
    <div id="loader-wrapper">
      <div id="loader">
        <div className="loader-ellips">
          <span className="loader-ellips__dot"></span>
          <span className="loader-ellips__dot"></span>
          <span className="loader-ellips__dot"></span>
          <span className="loader-ellips__dot"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
