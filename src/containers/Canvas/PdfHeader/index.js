import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import html2pdf from "html2pdf.js";
import {useSelector} from "react-redux";

import './Canvas.css';
import {compareArraysByName} from "../../utils/common";

const Canvas = () => {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const settings = process.env.PUBLIC_URL + assetsPath + 'images/settings.svg';
  const remove = process.env.PUBLIC_URL + assetsPath + 'images/remove.svg';

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

  const claysOnCanvas = useSelector(state => state.Status.claysDataOnCanvas);

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);
  const [rects, setRects] = useState([]);
  const [canvasBackgroundImage, setCanvasBackgroundImage] = useState('');


  const htmlRefs = useRef([]);

  const reactsOptions = [
    { left: 750, top: 70, width: 0, height: 0 },
    { left: 100, top: 300, width: 200, height: 200 },
    { left: 400, top: 200, width: 200, height: 200 },
    { left: 700, top: 300, width: 200, height: 200 },
  ];

  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 980,
      height: 720,
      backgroundColor: '#f0f0f0', // Optional: Set a default background color
    });

    setCanvasInstance(canvas); // Store the canvas instance
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

  const changeRectBackgroundImage = (index, newImageUrl) => {
    if (rects[index]) {
      fabric.Image.fromURL(newImageUrl, (img) => {
        // Create a new pattern with the loaded image
        const pattern = new fabric.Pattern({
          source: img.getElement(),
          repeat: 'no-repeat', // You can change this to 'repeat' or 'repeat-x' if needed
        });

        // Update the fill of the specified rectangle with the new pattern
        rects[index].set({ fill: pattern });

        // change labelLocation
        rects[index].set({
          /*name: data.name,
          top: reactsOptions[rects.length].top,
          left: reactsOptions[rects.length].left,

          width: rects[index].width,
          height: rects[index].height,*/

          labeLocation: {
            top: rects[index].top,
            left: rects[index].left
          },
        });

        // Re-render the canvas to apply changes
        rects[index].canvas.renderAll();

        // tooltip
        const canvas = canvasInstance;
        canvas.on('object:moving', (e) => {
          if (e.target.name === rects[index].name) {
            const currentHtmlRef = htmlRefs.current.find(item => item.id === rects[index].name);
            currentHtmlRef.style.left = `${e.target.left}px`;
            currentHtmlRef.style.right = `${canvas.width - e.target.left - rects[index].width}px`;
            currentHtmlRef.style.top = `${e.target.top}px`;

            currentHtmlRef.style.right = `${canvas.width - e.target.left - rects[index].width}px`;
            currentHtmlRef.style.top = `${e.target.top}px`;
          }
        });

        canvas.on('object:scaling', (e) => {
          if (e.target.name === rects[index].name) {
            let newWidth = rects[index].getScaledWidth();
            const currentHtmlRef = htmlRefs.current.find(item => item.id === rects[index].name);
            currentHtmlRef.style.width = `${newWidth}px`;
            currentHtmlRef.firstChild.style.width = `${newWidth - 140}px`;

            currentHtmlRef.style.left = `${e.target.left}px`;
            currentHtmlRef.style.right = `${canvas.width - e.target.left - rects[index].width}px`;
            currentHtmlRef.style.top = `${e.target.top}px`;

            currentHtmlRef.style.right = `${canvas.width - e.target.left - rects[index].width}px`;
            currentHtmlRef.style.top = `${e.target.top}px`;
          }
        })

      });
    }
  };

  useEffect(() => {

    const compareResult = compareArraysByName(claysOnCanvas, rects);

    if(compareResult.onlyInArray1.length > 0) {
      addRect(compareResult.onlyInArray1[0]);
    }

    if(compareResult.onlyInArray2.length > 0){
      removeRect(compareResult.onlyInArray2[0]);
    }

    if(claysOnCanvas.length === 0) {
      setCanvasBackgroundImage('assets/images/clays/canvas-container.png');

    }else{

      setCanvasBackgroundImage(claysOnCanvas[0].src);
    }


  }, [claysOnCanvas]);

  useEffect(() => {
    for (let i = 0; i < rects.length; i++) {
      changeRectBackgroundImage( i, rects[i].backgroundImageSrc);
    }
  }, [rects]);

  /*  const reOrderRects = () => {
      for (let i = 0; i < rects.length; i++) {
        changeRectBackgroundImage( i, rects[i].backgroundImageSrc);
      }
    }*/

  useEffect(() => {
    //if(canvasBackgroundImage === '') return;
    changeBackgroundImage(canvasBackgroundImage);
    /*   if(rects>0){
         rects[0].set({
           top: reactsOptions[0].top,
           left: reactsOptions[0].left,

           width: reactsOptions[0].width,
           height: reactsOptions[0].height,

           labeLocation: {
             top: reactsOptions[0].top,
             left: reactsOptions[0].left
           },
         });
       }*/
  }, [canvasBackgroundImage]);

  const addRect = (data) => {
    const canvas = canvasInstance;
    const rect = new fabric.Rect({
      name: data.name,
      top: reactsOptions[rects.length].top,
      left: reactsOptions[rects.length].left,

      width: reactsOptions[rects.length].width,
      height: reactsOptions[rects.length].height,

      labeLocation: {
        top: reactsOptions[rects.length].top,
        left: reactsOptions[rects.length].left
      },

      backgroundImageSrc: data.src
    });

    // Add the rectangles to the canvas
    canvas.add(rect);
    setRects(prevRects => [...prevRects, rect]);
  }

  const removeRect = (data) => {
    const canvas = canvasInstance;

    setRects(prevRects => {
      return prevRects.filter(r => r.name !== data.name);
    });

    canvas.remove(data);
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

      {rects.map((rect, index) => (
        <div
          id={rect.name}
          ref={(el) => (htmlRefs.current[index] = el)}
          style={{
            position: 'absolute',
            left: `${rect.left}px`,
            top: `${rect.top}px` ,
            width: '200px',
            height: '24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '60px',
            }}
          ></div>
          <div
            key={index}
            style={{
              width: '140px',
              height: '100%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              display: 'flex',
              justfyContent: 'space-between',
              // alignItems: 'center',
              justifyContent: 'center',
              // pointerEvents: 'none',
              fontSize: '12px',
              fontWeight: '500',
              marginTop:"-70px",
            }}
          >
            <div >{rect.name}</div>
            <img
              src={settings}
              alt={'setting'}
              style={{marginLeft: '8px', marginRight: '8px', cursor: 'pointer'}}
              /*onClick={isOpenCanvasItemConfigModal}*/
            />
            <img
              src={remove}
              alt={'remove'}
              style={{cursor: 'pointer'}}
              /*onClick={isOpenConfirmModal}*/
            />
          </div>
        </div>
      ))}

      {getDownloadPdfStatus &&
        (<>
          <div>
            <table border="1" className='acp-table'>
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
          <div className='acp-total-price'>
            <div>Total:</div>
            <div>€1162,64</div>
          </div>
        </>)
      }

    </div>
  );
};

export default Canvas;
