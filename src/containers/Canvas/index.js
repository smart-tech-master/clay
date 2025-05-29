import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
/*import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';*/
import {useDispatch, useSelector} from "react-redux";

import './Canvas.css';
import featureAction from "../../redux/feature/actions";
import {compareArraysByName} from "../../utils/common";
import Table from "./Table";


import { useTranslation } from "react-i18next";

const Canvas = () => {
  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const Logo = process.env.PUBLIC_URL + assetsPath + 'images/Logo.png';
  const settings = process.env.PUBLIC_URL + assetsPath + 'images/settings.svg';
  const remove = process.env.PUBLIC_URL + assetsPath + 'images/remove.svg';

  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const pdfContentRef = useRef();

  const generateImage = () => {
    if (canvasInstance) {
      const dataURL = canvasInstance.toDataURL({
        format: 'png',
        quality: 1.0
      });

      console.log('canvasInstance', dataURL);
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas-capture.png'; // Change extension if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  }

  const generatePDF = () => {
    const element = pdfContentRef.current;

    const options = {
      margin:       1,
      filename:     'invoice.pdf',
      image:        { type: 'jpeg', quality: 1 },
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

  const [rectsOptions, setRectsOptions] = useState([
    { left: 720, top: 70, width: 200, height: 10 },
    { left: 100, top: 300, width: 200, height: 200 },
    { left: 400, top: 200, width: 200, height: 200 },
    { left: 700, top: 300, width: 200, height: 200 },
  ]);

  const dispatch = useDispatch();
  const removeItem = (id) => {
    dispatch(featureAction.confirmModalActionDefine({type: featureAction.REMOVE_COLOUR_0N_CANVAS, payload: id}));
    dispatch(featureAction.isOpenConfirmModal());
  }

  const updatedColourDefine = (id) => {
    dispatch(featureAction.updatedColourDataDefine({status: false,from:id, to:id, order: 0}));
  }

  const isOpenCanvasItemConfigModal = (id) => {
    updatedColourDefine(id);

    dispatch(
      featureAction.isOpenCanvasItemConfigModal()
    );
  };

  const [rects, setRects] = useState([]);
  const coloursOnCanvas = useSelector(state => state.Feature.coloursOnCanvas);
  const updatedColour = useSelector(state => state.Feature.updatedColour);
  const priceData = useSelector(state => state.Feature.priceData);

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  const htmlRefs = useRef({});

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  useEffect(() => {
    //console.log('current screen size', size);
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
      /*repaintCanvas();*/
    };
    fetchData();
  }, [size]);

  useEffect(() => {
    let standardWidth = 1536;
    let standardHeight = 738;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let widthScale = 0.65;
    let heightScale = 1;
    let minWidth = 768;

    if(width <= minWidth) {
      widthScale = 1;
      heightScale = 0.5;
    }

    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: width * widthScale ,
      height: height * heightScale,
      backgroundColor: '#f0f0f0', // Optional: Set a default background color
    });

    setCanvasInstance(canvas); // Store the canvas instance

  /*  repaintCanvas();*/
    return () => {
      canvas.dispose(); // Dispose the canvas to prevent memory leaks
    };
  }, [size]);

  useEffect(() => {
    if(updatedColour.status) {
      try {
        /*dispatch(statusAction.updatedClayData());
        dispatch(statusAction.updateStatusOfUpdatedClayData(false));*/
        dispatch(featureAction.updateUserColours());
      } catch (error) {
        console.error('change background error:', error.message);
      }
    }
  }, [updatedColour]);

  useEffect(() => {
    const compareResult = compareArraysByName(coloursOnCanvas, rects);
    if(compareResult.onlyInArray1.length > 0) {
      setRects(prevState => [...prevState, compareResult.onlyInArray1[0]]);
    }

    if (compareResult.onlyInArray2.length > 0) {
      setRects(prevState => {
        return prevState.filter(r => r.name !== compareResult.onlyInArray2[0].name)
      });
    }

    if (compareResult.onlyInArray1.length === compareResult.onlyInArray2.length && compareResult.commonItems.length > 0) {
        setRects([...coloursOnCanvas]);
    }

  }, [coloursOnCanvas]);

  useEffect(() => {
    formateHtmlRef();
    repaintCanvas();
  }, [rects]);

  const formateHtmlRef = () => {
    for(let i = 0; i < rects.length; i++) {
      if(htmlRefs.current){
        if(htmlRefs.current[rects[i].id_product_attribute] !== null) {
          htmlRefs.current[rects[i].id_product_attribute].style.top = rectsOptions[i].top + 'px';
          htmlRefs.current[rects[i].id_product_attribute].style.left = rectsOptions[i].left + 'px';
          htmlRefs.current[rects[i].id_product_attribute].style.width = rectsOptions[i].width + 'px';
        }
      }
    }
  }

  const repaintCanvas = () => {
    const canvas = canvasInstance;
    if(canvas) {
      canvas.clear();
      canvas.renderAll();

      for(let i = 0; i < rects.length; i++) {
        //console.log('baseUrl + rects[i].color_image', baseUrl + rects[i].color_image);
        let rect;
        if(i === 0) {
          rect = new fabric.Rect({
            name: rects[i].id_product_attribute,
            top: rectsOptions[i].top + 3000,
            left: rectsOptions[i].left + 3000,
            width: rectsOptions[i].width,
            height: rectsOptions[i].height,
            backgroundImageSrc: baseUrl + rects[i].color_image
          });
        }else{
          rect = new fabric.Rect({
            name: rects[i].id_product_attribute,
            top: rects[i].visible ? rectsOptions[i].top : rectsOptions[i].top + 3000,
            left: rects[i].visible ? rectsOptions[i].left : rectsOptions[i].left + 3000,
            width: rectsOptions[i].width,
            height: rectsOptions[i].height,
            backgroundImageSrc: baseUrl + rects[i].color_image
          });
        }


        fabric.Image.fromURL(baseUrl+rects[i].color_image, (img) => {
         /* const pattern = new fabric.Pattern({
            source: img.getElement(),
            repeat: 'no-repeat',
          });
          rect.set({ fill: pattern });
          canvas.add(rect);*/
/*          img.set({ crossOrigin: "anonymous" });*/
          console.log('baseUrl+rects[i].color_image', baseUrl+rects[i].color_image);
          fetch(baseUrl + rects[i].color_image)
            .then(response => console.log(response.headers.get("Access-Control-Allow-Origin")))
            .catch(error => console.error("CORS error:", error));

          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = rect.width;   // make sure width is not 0
          tempCanvas.height = rect.height; // make sure height is not 0

          const ctx = tempCanvas.getContext('2d');
          ctx.drawImage(img.getElement(), 0, 0, rect.width, rect.height);

          const pattern = new fabric.Pattern({
            source: tempCanvas,
            repeat: 'no-repeat'
          });

          rect.set({ fill: pattern });
          canvas.add(rect);
        });

        canvas.on('object:moving', (e) => {
          htmlRefs.current[e.target.name].style.top = e.target.top + 'px';
          htmlRefs.current[e.target.name].style.left = e.target.left + 'px';
        });

        canvas.on('object:scaling', (e) => {
          htmlRefs.current[e.target.name].style.width = e.target.width * e.target.scaleX + 'px';
          htmlRefs.current[e.target.name].style.top = e.target.top + 'px';
          htmlRefs.current[e.target.name].style.left = e.target.left + 'px';
        });

      }

      // background image setting
      if(rects.length !== 0 ){
        fabric.Image.fromURL(baseUrl+rects[0].color_image, (img) => {
          img.set({
            left: 0,  // Position the image
            top: 0,   // Position the image
            scaleX: canvas.width / img.width,  // Scale to fit the canvas width
            scaleY: canvas.height / img.height, // Scale to fit the canvas height
          });

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      }else{
        fabric.Image.fromURL('assets/images/clays/canvas-container.png', (img) => {
          img.set({
            left: 0,  // Position the image
            top: 0,   // Position the image
            scaleX: canvas.width / img.width,  // Scale to fit the canvas width
            scaleY: canvas.height / img.height, // Scale to fit the canvas height
          });

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        });
      }

      canvas.renderAll();
    }
  }


  /*  const repaintCanvas = async () => {
      const canvas = canvasInstance;
      if (canvas) {
        canvas.clear();
        canvas.renderAll();

        // Proxy URL to bypass CORS issues
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        // Function to load an image safely with CORS handling
        const loadImageSafely = (url) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';  // Force CORS handling
            img.src = proxyUrl + 'https://via.placeholder.com/300';  // Use proxy to bypass CORS restrictions
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
          });
        };

        // Load rectangles with images
        for (let i = 0; i < rects.length; i++) {
          let rect = new fabric.Rect({
            name: rects[i].id_product_attribute,
            top: rects[i].visible ? rectsOptions[i].top : rectsOptions[i].top + 3000,
            left: rects[i].visible ? rectsOptions[i].left : rectsOptions[i].left + 3000,
            width: rectsOptions[i].width,
            height: rectsOptions[i].height
          });

          try {
            // Load external image safely using proxy
            const imgElement = await loadImageSafely(baseUrl + rects[i].color_image);

            // Create a temporary canvas to draw the image
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = rect.width;
            tempCanvas.height = rect.height;
            const ctx = tempCanvas.getContext('2d');
            ctx.drawImage(imgElement, 0, 0, rect.width, rect.height);

            // Convert to Fabric.js pattern
            const pattern = new fabric.Pattern({
              source: tempCanvas,
              repeat: 'no-repeat'
            });

            rect.set({ fill: pattern });
            canvas.add(rect);
          } catch (error) {
            console.error(error);
          }
        }

        // Load Background Image
        try {
          const bgImageUrl = rects.length !== 0 ? baseUrl + rects[0].color_image : 'assets/images/clays/canvas-container.png';
          const bgImgElement = await loadImageSafely(bgImageUrl);

          fabric.Image.fromURL(bgImgElement.src, (fabricImg) => {
            fabricImg.set({
              left: 0,
              top: 0,
              scaleX: canvas.width / bgImgElement.width,
              scaleY: canvas.height / bgImgElement.height
            });
            canvas.setBackgroundImage(fabricImg, canvas.renderAll.bind(canvas));
          }, { crossOrigin: 'anonymous' });
        } catch (error) {
          console.error("Error loading background image:", error);
        }

        canvas.renderAll();
      }
    };*/

  /* const repaintCanvas = () => {
     const canvas = canvasInstance;
     if (canvas) {
       canvas.clear();
       canvas.renderAll();

       for (let i = 0; i < rects.length; i++) {
         let rect = new fabric.Rect({
           name: rects[i].id_product_attribute,
           top: rects[i].visible ? rectsOptions[i].top : rectsOptions[i].top + 3000,
           left: rects[i].visible ? rectsOptions[i].left : rectsOptions[i].left + 3000,
           width: rectsOptions[i].width,
           height: rectsOptions[i].height
         });

         fabric.Image.fromURL(backgroundImage2, (img) => {
           const tempCanvas = document.createElement('canvas');
           tempCanvas.width = rect.width;   // make sure width is not 0
           tempCanvas.height = rect.height; // make sure height is not 0

           const ctx = tempCanvas.getContext('2d');
           ctx.drawImage(img.getElement(), 0, 0, rect.width, rect.height);

           const pattern = new fabric.Pattern({
             source: tempCanvas,
             repeat: 'no-repeat'
           });

           rect.set({ fill: pattern });
           canvas.add(rect);
         });
       }

       canvas.on('object:moving', (e) => {
         htmlRefs.current[e.target.name].style.top = e.target.top + 'px';
         htmlRefs.current[e.target.name].style.left = e.target.left + 'px';
       });

       canvas.on('object:scaling', (e) => {
         htmlRefs.current[e.target.name].style.width = e.target.width * e.target.scaleX + 'px';
         htmlRefs.current[e.target.name].style.top = e.target.top + 'px';
         htmlRefs.current[e.target.name].style.left = e.target.left + 'px';
       });

       // Set background image
       const backgroundImageUrl = rects.length !== 0 ? baseUrl + rects[0].color_image : 'assets/images/clays/canvas-container.png';
       /!*fabric.Image.fromURL(backgroundImageUrl, (img) => {*!/
       fabric.Image.fromURL('https://www.w3schools.com/html/pic_trulli.jpg', (img) => {
         img.set({
           left: 0,
           top: 0,
           scaleX: canvas.width / img.width,
           scaleY: canvas.height / img.height,
           crossOrigin: 'anonymous'
         });
         canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
       }, { crossOrigin: 'anonymous' });


 /!*      setTimeout(() => {*!/
         canvas.renderAll();
 /!*      }, 500);*!/
     }
   };*/



  const today = new Date();
  const formattedDate = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

/*  const language = useSelector(state => state.Feature.language);*/
//languageData[language]
  const { t, i18n } = useTranslation();

  return (
    <div className='canvas-container' ref={pdfContentRef}>
      {getDownloadPdfStatus && (<div className='pdf-header'>
        <div>{t('Bedroom')}</div>
        <div>
          <img src={Logo} alt='logo'/>
        </div>
        <div>{formattedDate}</div>
      </div>)}

      <div></div>
      <canvas ref={canvasRef} id="clayCanvas"></canvas>
      {
        rects.map((rect, index) => {
          /*console.log('htmlRefs', htmlRefs);*/
            return rect.visible && !getDownloadPdfStatus && (<div
              id={rect.id_product_attribute}
              key={index}
              ref={(el) => (htmlRefs.current[rect.id_product_attribute] = el)}
              style={{
                position: 'absolute',
                top: `${rectsOptions[index].top}px`,
                left: `${rectsOptions[index].left}px`,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'right',
                height: '24px',
                width: '200px',
              }}
            >
              <div></div>
              <div
                key={index}
                style={{
                  width: '140px',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '500',
                  marginTop: "-70px",
                }}
              >
                <div>{rect.color_name}</div>
                <img
                  src={settings}
                  alt={'setting'}
                  style={{marginLeft: '8px', marginRight: '8px', cursor: 'pointer'}}
                  onClick={()=>isOpenCanvasItemConfigModal(rect.id_product_attribute)}
                />
                <img
                  src={remove}
                  alt={'remove'}
                  style={{cursor: 'pointer'}}
                  onClick={() => removeItem(rect.id_product_attribute) }
                />
              </div>

            </div>)
          }
        )
      }
    {getDownloadPdfStatus && <Table />}
    </div>
  );
};

export default Canvas;
