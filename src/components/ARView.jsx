import React from "react";
import "aframe";

const ARView = ({ feature, onBack }) => {
  const renderFeature = () => {
    switch (feature) {
      case "image":
        return <a-image src="./assets/example.jpg" position="0 1 -3"></a-image>;
      case "video":
        return (
          <a-video
            src="./assets/example.mp4"
            position="0 1 -3"
            width="4"
            height="2.5"
          ></a-video>
        );
      case "stickers":
        return <a-entity face-tracker></a-entity>; // Example using a face-tracking component
      case "text":
        return <a-text value="Hello AR" position="0 1 -3" color="#FF0000"></a-text>;
      default:
        return null;
    }
  };

  return (
    <div className="ar-view">
      <button onClick={onBack}>Back</button>
      <a-scene>
        <a-camera position="0 1.6 0" look-controls></a-camera>
        {renderFeature()}
      </a-scene>
    </div>
  );
};

export default ARView;
