import React, {useEffect, useRef, useState} from 'react';
import { fabric } from 'fabric';
import "./Canvas.css";

import backgroundImage from '../../assets/images/clays/1_B.png';
import settings from "../../assets/images/settings.svg";
import remove from "../../assets/images/remove.svg";
import backgroundImage3 from "../../assets/images/clays/3_B.png";
import backgroundImage1 from "../../assets/images/clays/1_B.png";
import backgroundImage2 from "../../assets/images/clays/2_B.png";
import backgroundImage4 from "../../assets/images/clays/4_B.png";
import {useDispatch, useSelector} from "react-redux";


const Canvas = () => {
  const [index, setIndex] = useState(1);
  const [rects, setRects] = useState([]);

  const increaseIndex = () => {
    setIndex((index + 1)%4);
  };

  let objectsOptions = [
    { left: 400, top: 2000, backgroundImage: backgroundImage1, width: 0, height: 0 },
    { left: 100, top: 300, backgroundImage: backgroundImage2, width: 200, height: 200 },
    { left: 400, top: 200, backgroundImage: backgroundImage3, width: 200, height: 200 },
    { left: 700, top: 300, backgroundImage: backgroundImage4, width: 200, height: 200 },
  ];

  let imageUrls = [
    "assets/images/clays/1_B.png",
    "assets/images/clays/2_B.png",
    "assets/images/clays/4_B.png",
    "assets/images/clays/3_B.png"
  ];

  useEffect(() => {
    const canvas = new fabric.Canvas('myCanvas', {
      width: 500,
      height: 500,
      backgroundColor: '#f0f0f0',
    });

    fabric.Image.fromURL(imageUrls[0], (img) => {
      img.set({
        left: 0,  // Position the image
        top: 0,   // Position the image
        scaleX: canvas.width / img.width,  // Scale to fit the canvas
        scaleY: canvas.height / img.height, // Scale to fit the canvas
      });

      // Set the image as the background
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    fabric.Image.fromURL(imageUrls[index], (img) => {
      // Create a rectangle with the image as the background
      const rect = new fabric.Rect({
        left: 100,      // Position of the rectangle
        top: 100,       // Position of the rectangle
        width: 100,     // Width of the rectangle
        height: 100,    // Height of the rectangle
        fill: new fabric.Pattern({ source: img.getElement() }),  // Set the image as the fill pattern
        opacity: 1,     // Set opacity (optional)
        selectable: true,  // Make it selectable
        hasControls: true, // Enable resize and move controls
        hasBorders: false,  // Optional: Remove borders if you don't need them
      });

      // Add the rectangle to the canvas
      canvas.add(rect);
    });

    /*    return () => {
          canvas.dispose();  // Clean up on unmount
        };*/

  }, []);

  return (
    <div
      className='Canvas'
    >
      <button onClick={increaseIndex}>increase</button>
      <canvas id="myCanvas" width="500" height="500"></canvas>
    </div>
  );
};

export default Canvas;
