import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import QrScanner from 'react-qr-scanner';  // Import react-qr-scanner for QR code scanning
import 'aframe';  // Import A-Frame
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [qrCodeData, setQrCodeData] = useState(null);  // Store QR Code Data
  const [showQRScanner, setShowQRScanner] = useState(false);  // Toggle QR scanner visibility
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');  // Default to back camera (environment)

  // Handle QR scan result
  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data.text);  // Store scanned data
      setShowQRScanner(false);   // Hide the scanner once data is captured
    }
  };

  // Handle QR scan error
  const handleError = (err) => {
    console.error(err);
  };

  // Toggle between front and back camera
  const toggleCamera = () => {
    setCameraFacingMode((prevMode) => (prevMode === 'environment' ? 'user' : 'environment'));
  };

  return (
    <div className="App">
      <h1>AR with QR Scanner</h1>

      {/* Button to toggle QR Scanner */}
      <Button onClick={() => setShowQRScanner(!showQRScanner)} variant="primary">
        {showQRScanner ? 'Close Scanner' : 'Open QR Scanner'}
      </Button>

      {/* Button to switch between front and back camera */}
      {showQRScanner && (
        <Button onClick={toggleCamera} variant="secondary" style={{ marginLeft: '10px' }}>
          Switch to {cameraFacingMode === 'environment' ? 'Front' : 'Back'} Camera
        </Button>
      )}

      {/* Display the QR scanner when toggled */}
      {showQRScanner && (
        <QrScanner
          delay={300}  // QR scan delay
          style={{ width: '100%' }}  // Full-width scanner
          onScan={handleScan}  // Capture scanned data
          onError={handleError}  // Handle errors
          facingMode={cameraFacingMode}  // Set camera facing mode (back or front)
        />
      )}

      {/* Display AR scene when QR data is available */}
      {qrCodeData && (
        <a-scene embedded>
          <a-camera></a-camera>
          <a-marker preset="hiro">
            {/* Show the QR data as text in AR */}
            <a-text value={qrCodeData} align="center" color="#FFFFFF" font="mozillavr" scale="5 5 5" position="0 0 0"></a-text>
          </a-marker>
        </a-scene>
      )}
    </div>
  );
}

export default App;
