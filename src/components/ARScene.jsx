import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "aframe";
import jsQR from "jsqr";

const ARScene = () => {
  const cameraRef = useRef(null);
  const [qrData, setQrData] = React.useState("");

  useEffect(() => {
    if (!cameraRef.current) return;

    const videoElement = cameraRef.current;
    const canvasElement = document.createElement("canvas");
    const canvasContext = canvasElement.getContext("2d");

    const scanQRCode = () => {
      if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
        canvasElement.height = videoElement.videoHeight;
        canvasElement.width = videoElement.videoWidth;
        canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const qrCode = jsQR(imageData.data, canvasElement.width, canvasElement.height);

        if (qrCode) {
          setQrData(qrCode.data); // Set the QR code data
        }
      }
      requestAnimationFrame(scanQRCode);
    };

    scanQRCode();
  }, []);

  return (
    <div>
      <a-scene>
        {/* AR Camera and Marker */}
        <a-camera
          position="0 1.6 0"
          wasd-controls-enabled="false"
        ></a-camera>

        {qrData && (
          <a-text
            value={qrData}
            position="0 1.5 -3"
            scale="5 5 5"
            color="#00F"
            side="double"
          ></a-text>
        )}

        <a-entity camera look-controls></a-entity>
      </a-scene>

      <video
        ref={cameraRef}
        style={{ display: "none" }}
        width="100%"
        height="100%"
        autoPlay
        playsInline
        muted
      ></video>
    </div>
  );
};

export default ARScene;
