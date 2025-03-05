import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import html2pdf from "html2pdf.js";
import {useDispatch, useSelector} from "react-redux";

import './Canvas.css';
import statusAction from "../../redux/status/actions";
import Logo from "assets/images/Logo.png"
import settings from "../../assets/images/settings.svg";
import remove from "../../assets/images/remove.svg";
import {compareArraysByName} from "../../utils/common";
import backgroundImage3 from "../../assets/images/clays/3_B.png";
import backgroundImage1 from "../../assets/images/clays/1_B.png";
import backgroundImage2 from "../../assets/images/clays/2_B.png";
import backgroundImage4 from "../../assets/images/clays/4_B.png";


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

  const claysOnCanvas = useSelector(state => state.Status.claysDataOnCanvas);

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


  const htmlRefs = useRef([]);

  const reactsOptions = [
    { left: 400, top: 700, width: 0, height: 0 },
    { left: 100, top: 300, width: 200, height: 200 },
    { left: 400, top: 200, width: 200, height: 200 },
    { left: 700, top: 300, width: 200, height: 200 },
  ];

  const rectModel  = {
    rect,
    rectSize,
    rectLocation,
    labelLocation,
    pdfLabelLocation,
    backgroundImageSrc,
    order
  }

  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 980,
      height: 720,
      backgroundColor: '#f0f0f0', // Optional: Set a default background color
    });

    setCanvasInstance(canvas); // Store the canvas instance

    // Create two initial rectangles with color fills
    /* const rect0 = new fabric.Rect({
       name:"rect-0",
       left: 100,
       top: 300,
       width: 0,
       height: 0,
       fill: 'red', // Initial color fill
     });
     const rect1 = new fabric.Rect({
       name:"rect-1",
       left: 100,
       top: 300,
       width: 200,
       height: 200,
       fill: 'red', // Initial color fill
     });

     const rect2 = new fabric.Rect({
       name:"rect-2",
       left: 400,
       top: 200,
       width: 200,
       height: 200,
       fill: 'blue', // Initial color fill
     });

     const rect3 = new fabric.Rect({
       name:"rect-3",
       left: 700,
       top: 300,
       width: 200,
       height: 200,
       fill: 'green', // Initial color fill
     });

     // Add the rectangles to the canvas
     canvas.add(rect0);
     canvas.add(rect1);
     canvas.add(rect2);
     canvas.add(rect3);
     // Store the rectangles in state for later updates
     setRects([rect0, rect1, rect2, rect3]);*/
    // changeBackgroundImage('assets/images/clays/canvas-container.png');
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

        // Re-render the canvas to apply changes
        rects[index].canvas.renderAll();

        // tooltip
        const canvas = canvasInstance;
        canvas.on('object:moving', (e) => {
          if (e.target === rects[index] && htmlRefs.current[index]) {
            htmlRefs.current[index].style.left = `${e.target.left}px`;
            htmlRefs.current[index].style.right = `${canvas.width - e.target.left - rects[index].width}px`;
            htmlRefs.current[index].style.top = `${e.target.top}px`;

            htmlRefs.current[index].style.right = `${canvas.width - e.target.left - rects[index].width}px`;
            htmlRefs.current[index].style.top = `${e.target.top}px`;
          }
        });

        canvas.on('object:scaling', (e) => {
          if (e.target === rects[index] && htmlRefs.current[index]) {
            let newWidth = rects[index].getScaledWidth();
            htmlRefs.current[index].style.width = `${newWidth}px`;
            htmlRefs.current[index].firstChild.style.width = `${newWidth - 140}px`;

            htmlRefs.current[index].style.left = `${e.target.left}px`;
            htmlRefs.current[index].style.right = `${canvas.width - e.target.left - rects[index].width}px`;
            htmlRefs.current[index].style.top = `${e.target.top}px`;

            htmlRefs.current[index].style.right = `${canvas.width - e.target.left - rects[index].width}px`;
            htmlRefs.current[index].style.top = `${e.target.top}px`;
          }
        })

      });
    }
  };

  useEffect(() => {
    /*    if (claysOnCanvas.length === 0) {
          const compareResult = compareArraysByName(claysOnCanvas, rects);

          if(compareResult.onlyInArray1.length > 0) {
            addRect(compareResult.onlyInArray1[0]);
          }

          if(compareResult.onlyInArray2.length > 0){
            removeRect(compareResult.onlyInArray2[0]);
          }

          if(rects.length === 0) {
            setCanvasBackgroundImage(claysOnCanvas[0].src);
          }
          return;
        }*/

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

  /*  console.log('claysOnCanvas', claysOnCanvas);
    console.log('rects', rects);*/

  useEffect(() => {
    for (let i = 0; i < rects.length; i++) {
      let src = claysOnCanvas.filter(c => c.name === rects[i].name)[0].src;
      changeRectBackgroundImage( i, src);
      if(i===0) {
        rects[i].set({
          width: 0,
          height: 0,
          left: 400,
          top: 700
        })
      }

    }
  }, [rects])

  useEffect(() => {
    //if(canvasBackgroundImage === '') return;
    changeBackgroundImage(canvasBackgroundImage);
  }, [canvasBackgroundImage]);

  const addRect = (data) => {
    const canvas = canvasInstance;
    const rect = new fabric.Rect({
      name: data.name,
      left: reactsOptions[rects.length].left,
      top: reactsOptions[rects.length].top,
      width: reactsOptions[rects.length].width,
      height: reactsOptions[rects.length].height,
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

  // console.log(htmlRefs);

  const changeOrder = (firstOrder, SencondOrder) => {

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

      {claysOnCanvas.map((clay, index) => (
        <div
          ref={(el) => (htmlRefs.current[index] = el)}
          style={{
            position: 'absolute',
            left: index === 0 ? `${750}px` : `${100 + (index -1) * 300}px`,
            top: ((index === 2 ? 200 : (index === 0 ? 70 : 300)) + (getDownloadPdfStatus? 350 : 0) ) + 'px' ,
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
            <div >{clay.name}</div>
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
