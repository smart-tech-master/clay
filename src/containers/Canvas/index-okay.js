import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import './Canvas.css'
import {useDispatch, useSelector} from "react-redux";

const Canvas = () => {
  const canvasRef = useRef(null); // Reference to the canvas
  const [rects, setRects] = useState([]); // State to hold the rectangles
  const [index, setIndex] = useState(1);

  const dispatch = useDispatch();
  const claysOnCanvas = useSelector(state => state.Status.claysDataOnCanvas);

  const increaseIndex = () => {
    setIndex((index + 1)%4);
  };

  let imageUrls = [
    "assets/images/clays/1_B.png",
    "assets/images/clays/2_B.png",
    "assets/images/clays/4_B.png",
    "assets/images/clays/3_B.png"
  ];

  // Initialize the Fabric.js canvas when the component mounts
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 980,
      height: 720,
    });

    // Create two initial rectangles with color fills
    const rect1 = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      fill: 'red', // Initial color fill
    });

    const rect2 = new fabric.Rect({
      left: 400,
      top: 100,
      width: 200,
      height: 200,
      fill: 'blue', // Initial color fill
    });

    // Add the rectangles to the canvas
    canvas.add(rect1);
    canvas.add(rect2);

    // Store the rectangles in state for later updates
    setRects([rect1, rect2]);

    // Clean up the canvas on unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if(!rects[0]) return;
    fabric.Image.fromURL(imageUrls[claysOnCanvas.length], (img) => {
      // Create a new pattern with the loaded image
      const pattern = new fabric.Pattern({
        source: img.getElement(),
        repeat: 'no-repeat', // You can change this to 'repeat' or 'repeat-x' if needed
      });

      // Update the fill of the specified rectangle with the new pattern
      rects[0].set({ fill: pattern });

      // Re-render the canvas to apply changes
      rects[0].canvas.renderAll();
    });
  }, [claysOnCanvas]);


  // Function to change the background image of a specific rectangle
  const changeBackgroundImage = (rectIndex, newImageUrl) => {
    if (rects[rectIndex]) {
      fabric.Image.fromURL(newImageUrl, (img) => {
        // Create a new pattern with the loaded image
        const pattern = new fabric.Pattern({
          source: img.getElement(),
          repeat: 'no-repeat', // You can change this to 'repeat' or 'repeat-x' if needed
        });

        // Update the fill of the specified rectangle with the new pattern
        rects[rectIndex].set({ fill: pattern });

        // Re-render the canvas to apply changes
        rects[rectIndex].canvas.renderAll();
      });
    }
  };

  return (
    <div className='Canvas'>
      <canvas ref={canvasRef} id="myCanvas"></canvas>
      <button onClick={() => changeBackgroundImage(0, imageUrls[0])}>
        Change Background Image for Rect 1
      </button>
      <button onClick={() => changeBackgroundImage(1, imageUrls[1])}>
        Change Background Image for Rect 2
      </button>
      <button onClick={increaseIndex}>increase</button>
    </div>
  );
};

export default Canvas;
