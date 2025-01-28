import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import "aframe";
import jsQR from "jsqr";

const ARScene = () => {
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const [qrData, setQrData] = useState("");
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
        }
      }
      requestAnimationFrame(scanQRCode);
    };

    scanQRCode();
  }, [isCameraOn]);

  return (
    <div style={styles.container}>
      <button onClick={toggleCamera} style={styles.button}>
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>

      <a-scene>
        {/* AR Camera and Marker */}
        <a-camera position="0 1.6 0" wasd-controls-enabled="false"></a-camera>

        {qrData && (
          <a-text
            value={qrData}
            position="0 1.5 -3"
            scale="5 5 5"
            color="#00F"
            side="double"
            style={{ textAlign: "center" }}
          ></a-text>
        )}

        <a-entity camera look-controls></a-entity>
      </a-scene>

      <video
        ref={videoRef}
        style={styles.video}
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
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#000",
  },
  button: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "18px",
    zIndex: 1,
    cursor: "pointer",
    border: "none",
    outline: "none",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  video: {
    // display: "none",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
};

export default ARScene;
