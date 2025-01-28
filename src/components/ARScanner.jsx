import React from "react";
import { QrReader } from "react-qr-reader";

const ARScanner = ({ onFeatureScan }) => {
  const handleScan = (result) => {
    if (result?.text) {
      onFeatureScan(result.text);
    }
  };

  const handleError = (error) => {
    console.error("QR Scanner Error:", error);
  };

  return (
    <div className="scanner">
      <h2>Scan a QR Code</h2>
      <QrReader onResult={handleScan} onError={handleError} style={{ width: "100%" }} />
    </div>
  );
};

export default ARScanner;
