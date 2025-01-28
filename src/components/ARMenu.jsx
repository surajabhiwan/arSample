import React from "react";

const ARMenu = ({ onFeatureSelect }) => {
  const features = [
    { id: "image", label: "Render Image" },
    { id: "video", label: "Play Video" },
    { id: "stickers", label: "Add Face Stickers" },
    { id: "text", label: "Add 3D Text" },
  ];

  return (
    <div className="menu">
      <h2>Select a Feature</h2>
      {features.map((feature) => (
        <button key={feature.id} onClick={() => onFeatureSelect(feature.id)}>
          {feature.label}
        </button>
      ))}
    </div>
  );
};

export default ARMenu;
