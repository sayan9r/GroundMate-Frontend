import React from "react";
import "./loading.css";

function LoadingScreen() {
  return (
    <div className="loading-container ">
      <div className="loader-ring">
        <div className="ball-holder">
          <img
            src="/soccer-ball.png"
            alt="Loading..."
            className="soccer-ball"
          />
        </div>
      </div>

      <p className="loading-text">GroundMate...</p>
    </div>
  );
}

export default LoadingScreen;
