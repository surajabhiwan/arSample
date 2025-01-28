import React, { useState } from "react";
import ARMenu from "./components/ARMenu";
import ARScanner from "./components/ARScanner";
import ARView from "./components/ARView";
import "./styles/index.css";

const App = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="app">
      {!selectedFeature && (
        <>
          <h1>AR QR App</h1>
          <ARMenu onFeatureSelect={setSelectedFeature} />
          <ARScanner onFeatureScan={setSelectedFeature} />
        </>
      )}
      {selectedFeature && <ARView feature={selectedFeature} onBack={() => setSelectedFeature(null)} />}
    </div>
  );
};

export default App;
