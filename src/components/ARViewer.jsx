import React from "react";

const ARViewer = ({ content }) => {
  if (!content) return null;

  return (
    <a-scene embedded arjs>
      <a-marker preset="hiro">
        {content.type === "text" && (
          <a-text
            value={content.data}
            color="black"
            align="center"
            position="0 0.5 0"
            scale="2 2 2"
          ></a-text>
        )}
        {content.type === "image" && (
          <a-image src={content.data} width="2" height="2"></a-image>
        )}
        {content.type === "video" && (
          <a-video src={content.data} width="2" height="1.5"></a-video>
        )}
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARViewer;