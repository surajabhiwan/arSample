import React, { useEffect } from "react";
import ARScene from "./components/ARScene";

const App = () => {
  useEffect(() => {
    const startVideo = async () => {
      const videoElement = document.querySelector("video");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoElement.srcObject = stream;
    };
    startVideo();
  }, []);

  return (
    <div className="App">
      <h1>QR Code Scanner with AR</h1>
      <ARScene />
    </div>
  );
};

export default App;
