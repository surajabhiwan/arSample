import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRScanner = ({ onScan }) => {
  const [result, setResult] = useState("");

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
      onScan(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>Scanned: {result}</p>
    </div>
  );
};

export default QRScanner;