import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import "./Canvas.css";

import backgroundImage from '../../assets/images/clays/1_B.png';

const Canvas = () => {
  const canvasRef = useRef(null);
  const htmlRefs = useRef([]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 980,
      height: 720,
      backgroundColor: '#f0f0f0',
    });

    // Create three draggable rectangles with background images
    const objects = [
      { left: 100, top: 100, backgroundImage },
      { left: 350, top: 100, backgroundImage },
      { left: 600, top: 100, backgroundImage },
    ];


      objects.forEach((obj, index) => {
        fabric.Image.fromURL(obj.backgroundImage, (img) => {
          const rect = new fabric.Rect({
            left: obj.left,
            top: obj.top,
            width: 200,
            height: 300,
            fill: new fabric.Pattern({ source: img.getElement() }), // Set the background image as a pattern
            opacity: 1,
            selectable: true,
            hasControls: true,
            hasBorders: false,
          });
          canvas.add(rect);

          canvas.on('object:moving', (e) => {
            if (e.target === rect && htmlRefs.current[index]) {
              htmlRefs.current[index].style.left = `${e.target.left}px`;
              htmlRefs.current[index].style.top = `${e.target.top}px`;
            }
          });
        });
      });


    return () => canvas.dispose();
  }, []);

  return (
    <div className='Canvas' style={{ width: '65%', height: '100vh', position: 'relative', border: '1px solid black' }}>
      <canvas ref={canvasRef} />
      {["This is Object 1", "This is Object 2", "This is Object 3"].map((text, index) => (
        <div
          key={index}
          ref={(el) => (htmlRefs.current[index] = el)}
          style={{
            position: 'absolute',
            left: `${100 + index * 250}px`,
            top: '100px',
            width: '200px',
            height: '100px',
            backgroundColor: index === 0 ? 'lightblue' : index === 1 ? 'lightgreen' : 'lightcoral',
            border: '1px solid black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
