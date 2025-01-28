import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import "aframe";
import jsQR from "jsqr";

const ARScene = () => {
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const [qrData, setQrData] = useState("");
  const [qrType, setQrType] = useState(""); // To store the type of QR data
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [backCamera, setBackCamera] = useState(null);

  // Toggle camera state (on/off)
  const toggleCamera = async () => {
    if (isCameraOn) {
      // Stop the camera if it's on
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      setQrData("");
      setQrType(""); // Reset QR type
      setIsCameraOn(false);
    } else {
      // Start the camera if it's off
      const devices = await navigator.mediaDevices.enumerateDevices();
      const backCam = devices.find(device => device.kind === "videoinput" && device.label.toLowerCase().includes("back"));
      if (backCam) {
        setBackCamera(backCam.deviceId);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: backCam.deviceId },
        });
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    }
  };

  useEffect(() => {
    if (!isCameraOn) return;

    const videoElement = videoRef.current;
    const canvasElement = document.createElement("canvas");
    const canvasContext = canvasElement.getContext("2d");

    const scanQRCode = () => {
      if (videoElement && videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
        canvasElement.height = videoElement.videoHeight;
        canvasElement.width = videoElement.videoWidth;
        canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const qrCode = jsQR(imageData.data, canvasElement.width, canvasElement.height);

        if (qrCode) {
          setQrData(qrCode.data); // Set the QR code data
          // Detect the type of the QR code content
          if (qrCode.data.startsWith("http")) {
            if (qrCode.data.includes("video")) {
              setQrType("video");
            } else if (qrCode.data.includes("image")) {
              setQrType("image");
            } else {
              setQrType("url");
            }
          } else {
            setQrType("text");
          }
        }
      }
      requestAnimationFrame(scanQRCode);
    };

    scanQRCode();
  }, [isCameraOn]);

  return (
    <div>
      <button onClick={toggleCamera} style={styles.button}>
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>

      <a-scene>
        {/* AR Camera and Marker */}
        <a-camera position="0 1.6 0" wasd-controls-enabled="false"></a-camera>

        {/* Render based on QR type */}
        {qrType === "video" && (
          <a-video
            src={qrData}
    position="1.5 1.5 -8"
            width="4"
            height="2.5"
            scale="3 3 3"
          ></a-video>
        )}

        {qrType === "image" && (
          <a-image
            src={qrData}
   position="1.5 1.5 -8"
            width="2"
            height="2"
            scale="3 3 3"
          ></a-image>
        )}

        {qrType === "url" && (
          <a-text
            value={qrData}
        position="1.5 1.5 -8"
            scale="3 3 3"
            color="#00F"
            side="double"
          ></a-text>
        )}

        {qrType === "text" && (
          <a-text
            value={qrData}
          position="1.5 1.5 -8"
            scale="3 3 3"
            color="#00F"
            side="double"
          ></a-text>
        )}

        <a-entity camera look-controls></a-entity>
      </a-scene>

      <video
        ref={videoRef}
        style={{ display: isCameraOn ? "block" : "none" }}
        width="100%"
        height="100%"
        autoPlay
        playsInline
        muted
      ></video>
    </div>
  );
};

const styles = {
  button: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    zIndex: 1,
  },
};

export default ARScene;
