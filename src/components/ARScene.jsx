import React, { useEffect, useRef, useState } from "react";
import "aframe";
import "ar.js";

const ARScene = () => {
  const [qrData, setQrData] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const initializeAR = () => {
      // We need to make sure AR.js and A-Frame are loaded properly for AR functionality
      if (!window.AFRAME || !window.ARjs) return;

      const scene = document.createElement("a-scene");
      scene.setAttribute("embedded", "true");
      scene.setAttribute("arjs", "trackingMethod: best; sourceType: webcam;");

      const camera = document.createElement("a-camera");
      camera.setAttribute("position", "0 0 0");
      scene.appendChild(camera);

      // Add QR Code detection to the scene
      const marker = document.createElement("a-marker");
      marker.setAttribute("type", "barcode");
      marker.setAttribute("value", "1"); // Placeholder, can be updated with QR code value

      const qrText = document.createElement("a-text");
      qrText.setAttribute("value", "Scanning QR...");
      qrText.setAttribute("color", "#00F");
      qrText.setAttribute("scale", "5 5 5");
      qrText.setAttribute("position", "0 0 0");
      marker.appendChild(qrText);

      scene.appendChild(marker);

      // Append the AR scene to the DOM
      document.body.appendChild(scene);
    };

    // Initialize AR.js when the component is mounted
    initializeAR();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const handleQRData = (data) => {
    setQrData(data);
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <video
        ref={videoRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        autoPlay
        playsInline
        muted
      ></video>
      {qrData && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "10px",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          QR Code Data: {qrData}
        </div>
      )}
    </div>
  );
};

export default ARScene;
