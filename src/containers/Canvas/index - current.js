import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

import {useDispatch, useSelector} from "react-redux";
import statusAction from "../../redux/status/actions";

import "./Canvas.css";

import backgroundImage1 from 'assets/images/clays/1_B.png';
import backgroundImage2 from '../../assets/images/clays/2_B.png';
import backgroundImage3 from '../../assets/images/clays/3_B.png';
import backgroundImage4 from '../../assets/images/clays/4_B.png';

import settings from '../../assets/images/settings.svg';
import remove from '../../assets/images/remove.svg';

const Canvas = () => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);

  const isOpenCanvasItemConfigModal = () => {
    dispatch(
      statusAction.isOpenCanvasItemConfigModal()
    );
  };

  const isOpenConfirmModal = () => {
    dispatch(
      statusAction.isOpenConfirmModal()
    );
  }

  // canvas define
  const canvasRef = useRef(null);
  const htmlRefs = useRef([]);

  const claysOnCanvas = useSelector(state => state.Status.claysDataOnCanvas);

  useEffect(() => {
    const timer = setTimeout(() => {
      const claysObject = [...claysOnCanvas];


      for (let i = 0; i < claysObject.length; i++) {
        claysObject[i].left = objectsOptions[i].left;
        claysObject[i].top = objectsOptions[i].top;
        claysObject[i].width = objectsOptions[i].width;
        claysObject[i].height = objectsOptions[i].height;
      }

      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 980,
        height: 720,
        backgroundColor: '#f0f0f0',
      });

      // claysObject[0].src
      fabric.Image.fromURL(backgroundImage3, (img) => {
        // Stretch the background image to fit the canvas
        img.set({
          left: 0,
          top: 0,
          scaleX: canvas.width / img.width, // Scale the image horizontally
          scaleY: canvas.height / img.height, // Scale the image vertically
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: img.scaleX,
          scaleY: img.scaleY
        });
      });



      claysOnCanvas.forEach((obj, index) => {
          fabric.Image.fromURL(obj.src, (img) => {
            const rect = new fabric.Rect({
              left: obj.left,
              top: obj.top,
              width: obj.width,
              height: obj.height,
              // fill: img,
              fill: new fabric.Pattern({
                source: img.getElement(),
                // repeat: 'no-repeat',
                offsetX: 0,
                offsetY: 0,
                // // Scale the image to stretch it
                // scaleX: obj.width / img.width,
                // scaleY: obj.height / img.height
              }), // Set the background image as a pattern
              opacity: 1,
              selectable: true,
              hasControls: true,
              hasBorders: true,
              // lockScalingX: true,
              // lockScalingY: true
            });
            canvas.add(rect);

            canvas.on('object:moving', (e) => {
              if (e.target === rect && htmlRefs.current[index]) {
                htmlRefs.current[index].style.left = `${e.target.left}px`;
                htmlRefs.current[index].style.right = `${canvas.width - e.target.left - rect.width}px`;
                htmlRefs.current[index].style.top = `${e.target.top}px`;

                htmlRefs.current[index].style.right = `${canvas.width - e.target.left - rect.width}px`;
                htmlRefs.current[index].style.top = `${e.target.top}px`;
              }
            });

            canvas.on('object:scaling', (e) => {
              if (e.target === rect && htmlRefs.current[index]) {
                let newWidth = rect.getScaledWidth();
                htmlRefs.current[index].style.width = `${newWidth}px`;
                htmlRefs.current[index].firstChild.style.width = `${newWidth - 140}px`;

                htmlRefs.current[index].style.left = `${e.target.left}px`;
                htmlRefs.current[index].style.right = `${canvas.width - e.target.left - rect.width}px`;
                htmlRefs.current[index].style.top = `${e.target.top}px`;

                htmlRefs.current[index].style.right = `${canvas.width - e.target.left - rect.width}px`;
                htmlRefs.current[index].style.top = `${e.target.top}px`;
              }
            })
          });
      });
      return () => canvas.dispose();
    }, 300); // 2000ms delay
    return () => clearTimeout(timer);
  }, [claysOnCanvas]);

  return (
    <div className='Canvas'
         style={{
           width: '65%',
           height: '100vh',
           position: 'relative',
           left:'10px',
           // border: '1px solid black',
           display: 'flex',
        }}
    >
      <canvas ref={canvasRef} />
      {claysOnCanvas.map((clay, index) => (
        <div
          ref={(el) => (htmlRefs.current[index] = el)}
          style={{
            position: 'absolute',
            left: index === 0 ? '750px' : `${100 + (index - 1) * 300}px`,
            top: index === 2? '200px' : index === 0 ? '70px' : '300px',
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
              onClick={isOpenCanvasItemConfigModal}
            />
            <img
              src={remove}
              alt={'remove'}
              style={{cursor: 'pointer'}}
              onClick={isOpenConfirmModal}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
