// src/components/CaptureButton.js
import React from "react";

const MyCaptureButton = ({ isScreenSharing, startScreenCapture }) => {
  return (
    <div>
      <button onClick={startScreenCapture} disabled={isScreenSharing}>
        {isScreenSharing ? "측정 중" : "측정 시작"}
      </button>
    </div>
  );
};

export default MyCaptureButton;
