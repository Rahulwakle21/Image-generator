import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

const ImageCanvas = ({ imageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      width: 800,
      height: 600,
    });


    fabric.Image.fromURL(imageUrl, (img) => {
      img.scaleToWidth(600);
      canvas.add(img);
      canvas.renderAll();
    });

    
    const addText = () => {
      const text = new fabric.Textbox("Enter Caption", {
        left: 50,
        top: 50,
        fontSize: 24,
        fill: "#000",
      });
      canvas.add(text);
    };

    const addShape = (shape) => {
      let newShape;
    
      switch (shape) {
        case "circle":
          newShape = new fabric.Circle({
            radius: 50,
            fill: "rgba(0,0,0,0.3)",
            left: 100,
            top: 100,
          });
          break;
    
        case "rectangle":
          newShape = new fabric.Rect({
            width: 100,
            height: 60,
            fill: "rgba(0,0,0,0.3)",
            left: 200,
            top: 150,
          });
          break;
    
        case "triangle":
          newShape = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: "rgba(0,0,0,0.3)",
            left: 150,
            top: 150,
          });
          break;
    
        case "polygon":
          newShape = new fabric.Polygon(
            [
              { x: 200, y: 0 },
              { x: 250, y: 100 },
              { x: 150, y: 100 },
            ],
            {
              fill: "rgba(0,0,0,0.3)",
              left: 200,
              top: 200,
            }
          );
          break;
    
        default:
          return;
      }
    
      canvas.add(newShape);
    };
    

    const handleDownload = () => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL({ format: "png" });
      link.download = "edited_image.png";
      link.click();
    };

 
    document.getElementById("addText").onclick = addText;
    document.getElementById("addCircle").onclick = () => addShape("circle");
    document.getElementById("addRectangle").onclick = () => addShape("rectangle");
    document.getElementById("addTriangle").onclick = () => addShape("triangle");
    document.getElementById("addPolygon").onclick = () => addShape("polygon");
    document.getElementById("downloadImage").onclick = handleDownload;

    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  return (
    <div className="canvas-container">
      <canvas id="canvas" ref={canvasRef}></canvas>
      <div className="controls">
        <button id="addText">Add Text</button>
        <button id="addCircle">Add Circle</button>
        <button id="addRectangle">Add Rectangle</button>
        <button id="addTriangle">Add Triangle</button>
        <button id="addPolygon">Add Polygon</button>
        <button id="downloadImage">Download</button>
      </div>
    </div>
  );
};

export default ImageCanvas;
