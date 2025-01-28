// src/components/ARViewer.jsx
import React, { useState, useEffect } from 'react';
import { useQrReader } from 'react-qr-reader';
import * as THREE from 'three';
import 'aframe';
import "ar.js/aframe/aframe-ar.js";


const ARViewer = () => {
  const [qrData, setQrData] = useState('');
  const [isScanned, setIsScanned] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setQrData(data.text);
      setIsScanned(true);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const renderARContent = () => {
    if (qrData.includes("text")) {
      return <a-text value="Hello AR World!" color="blue" position="0 0.5 -2" scale="5 5 5" />;
    }
    if (qrData.includes("image")) {
      return <a-image src="https://source.unsplash.com/random/800x600" position="0 0 -3" />;
    }
    if (qrData.includes("video")) {
      return (
        <a-video
          src="https://www.w3schools.com/html/movie.mp4"
          position="0 0 -3"
          width="16"
          height="9"
        />
      );
    }
    return null;
  };

  return (
    <div>
      {!isScanned && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Scan a QR code to view AR content</h2>
          <div style={{ width: '300px', margin: '0 auto' }}>
            <QRCodeScanner onScan={handleScan} onError={handleError} />
          </div>
        </div>
      )}
      {isScanned && (
        <a-scene embedded arjs>
          <a-marker preset="hiro">
            {renderARContent()}
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      )}
    </div>
  );
};

const QRCodeScanner = ({ onScan, onError }) => {
  const { ref } = useQrReader({
    onResult: onScan,
    onError: onError,
    constraints: { facingMode: 'environment' },
  });

  return <video ref={ref} />;
};

export default ARViewer;
