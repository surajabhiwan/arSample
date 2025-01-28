import React, { useState } from "react";
import QRScanner from "./components/QRScanner";
import ARViewer from "./components/ARViewer";
import "./index.css";

const App = () => {
  const [content, setContent] = useState(null);

  const handleScan = (data) => {
    try {
      const parsedData = JSON.parse(data);
      setContent(parsedData);
    } catch (error) {
      console.error("Invalid QR Code");
    }
  };

  return (
    <div>
      <h1>AR QR Scanner</h1>
      <QRScanner onScan={handleScan} />
      <ARViewer content={content} />
    </div>
  );
};

export default App;