import React, { useState } from "react";
import ImageCanva from "./ImageCanva";

const ImageResult = ({ image }) => {
  const [showCanvas, setShowCanvas] = useState(false);

  return (
    <div className="image-item">
      
      <img src={image.urls.small} alt={`Image by ${image.user.name}`} />
      
      <button onClick={() => setShowCanvas(true)}>Add Captions</button>
      
      {showCanvas && <ImageCanva imageUrl={image.urls.regular} />}
    </div>
  );
};

export default ImageResult;
