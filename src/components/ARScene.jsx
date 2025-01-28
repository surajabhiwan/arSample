import React, { useRef, useEffect, useState } from "react";
import * as BABYLON from "babylonjs";
import jsQR from "jsqr";

const ARScene = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [qrData, setQrData] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);

    // Create Camera
    const camera = new BABYLON.ArcRotateCamera(
      "camera1",
      Math.PI / 2,
      Math.PI / 2,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    // Set up light
    new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);

    // Create 3D text when QR code is found
    const create3DText = (data) => {
      const textMesh = BABYLON.MeshBuilder.CreateText("qrText", {
        text: data,
        size: 3,
        color: "cyan",
        font: "Arial",
      }, scene);
      textMesh.position = new BABYLON.Vector3(0, 2, -5); // Position it in front of camera
    };

    // QR Scanning Logic
    const scanQRCode = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

        if (qrCode) {
          setQrData(qrCode.data); // Store QR code data
          create3DText(qrCode.data); // Display QR data as 3D text
        }
      }

      requestAnimationFrame(scanQRCode);
    };

    // Start QR code scanning
    scanQRCode();

    // Start Babylon.js render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Resize handler for window resizing
    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      // Cleanup on component unmount
      window.removeEventListener("resize", () => engine.resize());
      engine.dispose();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraReady(true); // Mark camera as ready when stream is successfully set
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  return (
    <div>
      {!isCameraReady ? (
        <button onClick={startCamera}>Start Camera</button>
      ) : (
        <div style={{ position: "relative" }}>
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
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
        </div>
      )}
      {qrData && <div className="qr-data-display">QR Code Data: {qrData}</div>}
    </div>
  );
};

export default ARScene;
