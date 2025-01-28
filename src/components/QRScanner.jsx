import React, { useRef, useState } from 'react';
import jsQR from 'jsqr';

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanResult, setScanResult] = useState(null);

  const startScan = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
    requestAnimationFrame(tick);
  };

  const tick = () => {
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setScanResult(code.data);
        onScan(code.data);
      }
    }
    requestAnimationFrame(tick);
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />
      <button onClick={startScan}>Start Scan</button>
      {scanResult && <p>Scanned: {scanResult}</p>}
    </div>
  );
};

export default QRScanner;