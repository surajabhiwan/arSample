import React, { useState } from 'react';
import { useQrReader } from 'react-qr-reader';

const ARViewer = () => {
  const [qrData, setQrData] = useState('');
  const [isScanned, setIsScanned] = useState(false);
  const [isVr, setIsVr] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setQrData(data.text);
      setIsScanned(true);
    }
  };

  const handleError = (error) => {
    console.error('QR Scan Error:', error);
  };

  const renderARContent = () => {
    if (qrData.includes('text')) {
      return <a-text value="Hello AR World!" color="blue" position="0 0.5 -2" scale="5 5 5" />;
    }
    if (qrData.includes('image')) {
      return <a-image src="https://source.unsplash.com/random/800x600" position="0 0 -3" />;
    }
    if (qrData.includes('video')) {
      return (
        <a-video
          src="https://www.w3schools.com/html/movie.mp4"
          position="0 0 -3"
          width="16"
          height="9"
        />
      );
    }
    return <a-text value="Unknown Content" position="0 0.5 -2" color="red" />;
  };

  return (
    <div>
      {!isScanned && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setIsScanned(true)} style={{ fontSize: '20px' }}>
            Open Camera to Scan QR Code
          </button>
        </div>
      )}

      {isScanned && !isVr && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Scan Complete! Choose your view:</h2>
          <button onClick={() => setIsVr(true)} style={{ fontSize: '20px', margin: '10px' }}>
            View in VR
          </button>
          <div style={{ width: '300px', margin: '0 auto' }}>
            <QRCodeScanner onScan={handleScan} onError={handleError} />
          </div>
        </div>
      )}

      {isScanned && isVr && (
        <a-scene embedded>
          <a-entity camera position="0 0 5" />
          {renderARContent()}
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

  return <video ref={ref} style={{ width: '100%', height: 'auto' }} />;
};

export default ARViewer;
