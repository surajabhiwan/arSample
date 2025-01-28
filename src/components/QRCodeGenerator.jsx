import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = () => {
  const features = [
    { id: "image", label: "Render Image" },
    { id: "video", label: "Play Video" },
    { id: "stickers", label: "Add Face Stickers" },
    { id: "text", label: "Add 3D Text" },
  ];

  return (
    <div className="qr-generator">
      <h2>Generate QR Codes</h2>
      {features.map((feature) => (
        <div key={feature.id} className="qr-item">
          <p>{feature.label}</p>
          <QRCode value={feature.id} size={128} />
        </div>
      ))}
    </div>
  );
};

export default QRCodeGenerator;
