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
import statusActions from "../../redux/status/actions";

const Canvas = () => {
  const rectsOptions = [
    { left: 750, top: 70, width: 200, height: 0 },
    { left: 100, top: 300, width: 200, height: 200 },
    { left: 400, top: 200, width: 200, height: 200 },
    { left: 700, top: 300, width: 200, height: 200 },
  ];

  const dispatch = useDispatch();
  const removeItem = (name) => {
    dispatch(statusActions.confirmModalActionDefine({
      type: statusActions.REMOVE_CALY_ON_CANVAS,
      payload: name,
    }));
    dispatch(
      statusAction.isOpenConfirmModal()
    );
  }
  const UpdatedClayDataDefine = (name) => {
    dispatch(
      statusAction.updatedClayDataDefine({status: false,from:name, to:name, order: 1})
    )
  }
  const isOpenCanvasItemConfigModal = (name) => {
    UpdatedClayDataDefine(name);

    dispatch(
      statusAction.isOpenCanvasItemConfigModal()
    );
  };

  const [rects, setRects] = useState([]);
  const claysOnCanvas = useSelector(state => state.Status.claysDataOnCanvas);
  const updatedClayData = useSelector(state => state.Status.updatedClayData);

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  const htmlRefs = useRef({});

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

  useEffect(() => {
    if(updatedClayData.status) {
      try {
        dispatch(statusAction.updatedClayData());
        dispatch(statusAction.updateStatusOfUpdatedClayData(false));
      } catch (error) {
        console.error('change background error:', error.message);
      }
    }
  }, [updatedClayData]);

  useEffect(() => {
    const compareResult = compareArraysByName(claysOnCanvas, rects);
    if(compareResult.onlyInArray1.length > 0) {
      setRects(prevState => [...prevState, compareResult.onlyInArray1[0]]);
    }

    if (compareResult.onlyInArray2.length > 0) {
      setRects(prevState => {
        return prevState.filter(r => r.name !== compareResult.onlyInArray2[0].name)
      });
    }

    if (compareResult.onlyInArray1.length === compareResult.onlyInArray2.length && compareResult.commonItems.length > 0) {
      setRects([...claysOnCanvas]);
      console.log('visible update');
    }

  }, [claysOnCanvas]);

  useEffect(() => {
    console.log('htmlRefs', htmlRefs);
    formateHtmlRef();
    repaintCanvas();
  }, [rects]);

  const formateHtmlRef = () => {
    for(let i = 0; i < rects.length; i++) {
      if(htmlRefs.current){
        if(htmlRefs.current[rects[i].name] !== null) {
          htmlRefs.current[rects[i].name].style.top = rectsOptions[i].top + 'px';
          htmlRefs.current[rects[i].name].style.left = rectsOptions[i].left + 'px';
          htmlRefs.current[rects[i].name].style.width = rectsOptions[i].width + 'px';
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

        let rect = new fabric.Rect({
          name: rects[i].name,
          top: rectsOptions[i].top,
          left: rectsOptions[i].left,
          width: rects[i].visible ? rectsOptions[i].width : 0,
          height: rects[i].visible ? rectsOptions[i].height : 0,
          backgroundImageSrc: rects[i].src
        });

        fabric.Image.fromURL(rects[i].src, (img) => {
          const pattern = new fabric.Pattern({
            source: img.getElement(),
            repeat: 'no-repeat', // You can change this to 'repeat' or 'repeat-x' if needed
          });
          rect.set({ fill: pattern });
          canvas.add(rect);
        });

        canvas.on('object:moving', (e) => {
          /*   console.log('object:moving', htmlRefs);*/
          htmlRefs.current[e.target.name].style.top = e.target.top + 'px';
          htmlRefs.current[e.target.name].style.left = e.target.left + 'px';
        });

        canvas.on('object:scaling', (e) => {
          /*   console.log('object:scaling', htmlRefs)*/
          htmlRefs.current[e.target.name].style.width = e.target.width * e.target.scaleX + 'px';
          htmlRefs.current[e.target.name].style.top = e.target.top + 'px';
          htmlRefs.current[e.target.name].style.left = e.target.left + 'px';
        })

      }

      // background image setting
      if(rects.length !== 0 ){
        fabric.Image.fromURL(rects[0].src, (img) => {
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

  return (
    <div className='canvas-container'>
      <canvas ref={canvasRef} id="clayCanvas"></canvas>
      {
        rects.map((rect, index) => {
            console.log('htmlRefs', htmlRefs);
            /*console.log('htmlRefs', htmlRefs);*/
            return rect.visible && (<div
              id={rect.name}
              key={index}
              ref={(el) => (htmlRefs.current[rect.name] = el)}
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
                <div>{rect.name}</div>
                <img
                  src={settings}
                  alt={'setting'}
                  style={{marginLeft: '8px', marginRight: '8px', cursor: 'pointer'}}
                  onClick={()=>isOpenCanvasItemConfigModal(rect.name)}
                />
                <img
                  src={remove}
                  alt={'remove'}
                  style={{cursor: 'pointer'}}
                  onClick={() => removeItem(rect.name) }
                />
              </div>

            </div>)
          }
        )
      }
    </div>
  );
};

export default Canvas;
