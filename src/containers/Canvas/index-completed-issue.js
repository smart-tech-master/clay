import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import html2pdf from "html2pdf.js";
import {useDispatch, useSelector} from "react-redux";

import './Canvas.css';
import statusAction from "../../redux/status/actions";
import Logo from "assets/images/Logo.png"


const Canvas = () => {
  // pdf download
  const pdfContentRef = useRef();
  const generatePDF = () => {
    const element = pdfContentRef.current;
    const options = {
      margin:       1,
      filename:     'invoice.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true },
      jsPDF:        { unit: 'in', format: [12.5, 18.75], orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  };
  const getDownloadPdfStatus = useSelector(state => state.Status.downloadPdf);
  useEffect(()=>{
    if(getDownloadPdfStatus) {
      generatePDF();
    }
  }, [getDownloadPdfStatus]);

  // const canvasRef = useRef(null); // Reference to the canvas
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

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);
  const [rects, setRects] = useState([]);

  const [canvasBackgroundImage, setCanvasBackgroundImage] = useState('');


  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 980,
      height: 720,
      backgroundColor: '#f0f0f0', // Optional: Set a default background color
    });

    setCanvasInstance(canvas); // Store the canvas instance

    // Create two initial rectangles with color fills
    const rect1 = new fabric.Rect({
      left: 100,
      top: 300,
      width: 200,
      height: 200,
      fill: 'red', // Initial color fill
    });

    const rect2 = new fabric.Rect({
      left: 400,
      top: 200,
      width: 200,
      height: 200,
      fill: 'blue', // Initial color fill
    });

    const rect3 = new fabric.Rect({
      left: 700,
      top: 300,
      width: 200,
      height: 200,
      fill: 'green', // Initial color fill
    });

    // Add the rectangles to the canvas
    canvas.add(rect1);
    canvas.add(rect2);
    canvas.add(rect3);
    // Store the rectangles in state for later updates
    setRects([rect1, rect2, rect3]);

    // Clean up when the component unmounts
    return () => {
      canvas.dispose(); // Dispose the canvas to prevent memory leaks
    };
  }, []);

  const changeBackgroundImage = (newImageUrl) => {
    const canvas = canvasInstance;

    if (canvas) {
      fabric.Image.fromURL(newImageUrl, (img) => {
        // Scale the image to fit the canvas
        img.set({
          left: 0,  // Position the image
          top: 0,   // Position the image
          scaleX: canvas.width / img.width,  // Scale to fit the canvas width
          scaleY: canvas.height / img.height, // Scale to fit the canvas height
        });

        // Set the image as the background of the canvas
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
  };

  const changeRectBackgroundImage = (rectIndex, newImageUrl) => {
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

  useEffect(() => {
    if (claysOnCanvas.length === 0) return;
    setCanvasBackgroundImage(claysOnCanvas[0].src);

    for (let i = 1; i < claysOnCanvas.length; i++) {
      let rectIndex = i-1;
      let src = claysOnCanvas[i].src;
      changeRectBackgroundImage( i-1, src);
    }
  }, [claysOnCanvas]);

  useEffect(() => {
    if(canvasBackgroundImage === '') return;
    changeBackgroundImage(claysOnCanvas[claysOnCanvas.length - 1].src);
  }, [canvasBackgroundImage]);

  const addRect = () => {
    const canvas = canvasInstance;
    const rect3 = new fabric.Rect({
      left: 700,
      top: 100,
      width: 200,
      height: 200,
      fill: 'green', // Initial color fill
    });

    // Add the rectangles to the canvas
    canvas.add(rect3);
  }

  const removeRect = () => {
    const canvas = canvasInstance;
    canvas.remove(rects[0]);
    canvas.renderAll();
  }

  return (
    <div className='Canvas' ref={pdfContentRef}>
      {getDownloadPdfStatus && (<div className='pdf-header'>
        <div>Bedroom</div>
        <div>
          <img src={Logo} alt='logo'/>
        </div>
        <div>2025-02-03</div>
      </div>)}

      <div></div>

      <canvas ref={canvasRef} id="myCanvas"></canvas>
      <button onClick={() => changeBackgroundImage(imageUrls[0])}>
        Set Background Image
      </button>
      <button onClick={() => changeRectBackgroundImage(0, imageUrls[0])}>
        Change Background Image for Rect 1
      </button>
      <button onClick={() => addRect()}>
        Add Rect
      </button>
      <button onClick={() => removeRect()}>
        remove Rect
      </button>


      {getDownloadPdfStatus &&
        (<>
          <div>
            <table border="1">
              <thead>
              <tr>
                <th>Colour</th>
                <th>M²</th>
                <th>Total</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1_b</td>
                <td>158</td>
                <td>€290.66</td>
              </tr>
              <tr>
                <td>2_b</td>
                <td>158</td>
                <td>€290.66</td>
              </tr>
              <tr>
                <td>3_b</td>
                <td>158</td>
                <td>€290.66</td>
              </tr>
              <tr>
                <td>4_b</td>
                <td>158</td>
                <td>€290.66</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div className='total-price'>
            <div>Total:</div>
            <div>€1162,64</div>
          </div>
        </>)
      }

    </div>
  );
};

export default Canvas;
