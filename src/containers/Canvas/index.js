import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import html2pdf from "html2pdf.js";
import {useDispatch, useSelector} from "react-redux";

import './Canvas.css';
import featureAction from "../../redux/feature/actions";
import {compareArraysByName} from "../../utils/common";
import Table from "./Table";

import { useTranslation } from "react-i18next";

function useDebouncedResize(callback, delay = 200) {
  useEffect(() => {
    let timeoutId;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback();
      }, delay);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
}

const Canvas = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useDebouncedResize(() => {
    // console.log('Resize ended');
    setWindowWidth(window.innerWidth);
  }, 300); // You can tweak the delay

  // assets init
  const assetsPath = useSelector(state => state.Feature.assetsPath);
  const Logo = process.env.PUBLIC_URL + assetsPath + 'images/Logo.png';
  const settings = process.env.PUBLIC_URL + assetsPath + 'images/settings.svg';
  const remove = process.env.PUBLIC_URL + assetsPath + 'images/remove.svg';

  const baseUrl = useSelector(state => state.Feature.imageBaseUrl);

  const pdfContentRef = useRef();

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

  const screenWidth = window.innerWidth;
  const rootWidth = document.getElementById('root').offsetWidth;
  const leftPositionMargin = (screenWidth - rootWidth) / 2;

  useEffect(() => {
    let widthScale = rootWidth > 768 ? 0.65 : 1;
    let canvasWidth = rootWidth * widthScale;

    let unitWidth = canvasWidth / 20;
    let reactWidth = unitWidth * 4;
    let reactHeight = reactWidth;
    
    const bgRectLeftPosition = unitWidth * 14;
    const bgRectTopPosition = 70;

    const firstRectLeftPosition = unitWidth * 2;
    const firstRectTopPosition = 300;
    
    const secondRectLeftPosition = unitWidth * 2 + reactWidth + unitWidth * 2;
    const secondRectTopPosition = 200;

    const thirdRectLeftPosition = unitWidth * 2 + reactWidth + unitWidth * 2 + reactWidth + unitWidth * 2;
    const thirdRectTopPosition = 300;

    const reactPositionInit = [
      { left: bgRectLeftPosition, top: bgRectTopPosition, width: reactWidth, height: reactHeight },
      { left: firstRectLeftPosition, top: firstRectTopPosition, width: reactWidth, height: reactHeight },
      { left: secondRectLeftPosition, top: secondRectTopPosition, width: reactWidth, height: reactHeight },
      { left: thirdRectLeftPosition, top: thirdRectTopPosition, width: reactWidth, height: reactHeight },
    ];

    setRectsOptions([...reactPositionInit]);
  }, [windowWidth]);

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

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  const htmlRefs = useRef({});

  const getScaleInfo = () => {
    let width = document.getElementById('root').offsetWidth;
    let height = window.innerHeight;
    let widthScale = 0.65;
    let heightScale = 1;
    let minWidth = 768;

    if(width <= minWidth) {
      widthScale = 1;
      heightScale = 0.8;
    }

    return { 
      canvasWidth: width * widthScale, 
      canvasHeight: height * heightScale
    }
  }

  useEffect(() => {
    const scaleInfo = getScaleInfo();

    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: scaleInfo.canvasWidth ,
      height: scaleInfo.canvasHeight,
      //backgroundColor: '#f0f0f0', // Optional: Set a default background color
      backgroundColor: '#ffffff', // Optional: Set a default background color
    });

    setCanvasInstance(canvas); // Store the canvas instance

  /*  repaintCanvas();*/
    return () => {
      canvas.dispose(); // Dispose the canvas to prevent memory leaks
    };
  }, []);

  useEffect(() => {
    if(updatedColour.status) {
      try {
        dispatch(featureAction.updateUserColours());
      } catch (error) {
        console.error('change background error:', error.message);
      }
    }
  }, [updatedColour]);

  const _isSelectedObject = useSelector(state => state.Feature.isSelectedObject);
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

    if(_isSelectedObject) {
      setRects([...coloursOnCanvas]);
      dispatch(featureAction.isSelectedObject());
    }

  }, [coloursOnCanvas]);

  useEffect(() => {
    formateHtmlRef();
    repaintCanvas();
  }, [rects, rectsOptions]);

  const formateHtmlRef = () => {
    for(let i = 0; i < rects.length; i++) {
      if(htmlRefs.current){
        if(htmlRefs.current[rects[i].id_product_attribute] !== null) {
          htmlRefs.current[rects[i].id_product_attribute].style.top = rectsOptions[i].top + 'px';
          
          htmlRefs.current[rects[i].id_product_attribute].style.left = rectsOptions[i].left + leftPositionMargin + 'px';
          
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
            backgroundImageSrc: baseUrl + rects[i].color_image,
          });
        }

        fabric.Image.fromURL(baseUrl+rects[i].color_image, (img) => {

          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = rect.width;   // make sure width is not 0
          tempCanvas.height = rect.height; // make sure height is not 0

          const ctx = tempCanvas.getContext('2d');
          ctx.drawImage(
            img.getElement(), 
            0, 0
          );

          const pattern = new fabric.Pattern({
            source: tempCanvas,
            repeat: 'repeat'
          });

          rect.set(
            { 
              fill: pattern,
              scaleX: 1,
              scaleY: 1
            }
          );
          canvas.add(rect);
        });

        canvas.on('object:moving', (e) => {
          htmlRefs.current[e.target.name].style.top = e.target.top + 'px';
          htmlRefs.current[e.target.name].style.left = e.target.left + leftPositionMargin +'px';
        });

        canvas.on('object:scaling', (e) => {
          htmlRefs.current[e.target.name].style.width = e.target.width * e.target.scaleX + 'px';
          htmlRefs.current[e.target.name].style.top = e.target.top + 'px';
          htmlRefs.current[e.target.name].style.left = e.target.left + leftPositionMargin + 'px';
        });

        let scalingTimeout = null;
        canvas.on('object:modified', (e) => {
          const obj = e.target;
          if (!obj || obj.type !== 'rect') return;
        
          clearTimeout(scalingTimeout); // clear any pending triggers
        
          scalingTimeout = setTimeout(() => {
            const name = obj.name;
            const rectData = rects.find(r => r.id_product_attribute == name);
            if (!rectData) return;
        
            const imageUrl = baseUrl + rectData.color_image;
        
            fabric.Image.fromURL(imageUrl, (img) => {
              const tempCanvas = document.createElement('canvas');
              tempCanvas.width = obj.width * obj.scaleX;
              tempCanvas.height = obj.height * obj.scaleY;
        
              const ctx = tempCanvas.getContext('2d');
              ctx.drawImage(img.getElement(), 0, 0);
        
              const pattern = new fabric.Pattern({
                source: tempCanvas,
                repeat: 'repeat'
              });
        
              obj.set({
                fill: pattern,
                width: tempCanvas.width,
                height: tempCanvas.height,
                scaleX: 1,
                scaleY: 1
              });
        
              obj.dirty = true;
              canvas.requestRenderAll();
            });
          }, 150); // Wait 150ms after last event
        });
        

      }

      // background image setting backgroundColor: '#ffffff',
      if(rects.length !== 0 && rects[0].visible){
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
        canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));
      }

      const scaleInfo = getScaleInfo();
      canvas.setWidth(scaleInfo.canvasWidth);
      canvas.setHeight(scaleInfo.canvasHeight);
      canvas.renderAll();
    }
  }

  const today = new Date();
  const formattedDate = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  const { t, i18n } = useTranslation();

  return (
    <div className='acp-canvas-container' ref={pdfContentRef}>
      {getDownloadPdfStatus && (<div className='acp-pdf-header'>
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
                  width: '115px',
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
