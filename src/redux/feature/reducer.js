import actions from './actions';
import { produce } from 'immer';

import { convertAllProductsToColourArray } from 'utils/common'

const initState = {
  userObjects: [
    {
      objectId: 0,
      objectName: "Bedroom",
      object: {
        coloursOnCanvas:[
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '12_B',
            color_image: 'https://clay.powdev.lt/img/co/33.jpg',
            id_product_attribute: '75',
            price: 54.545455,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'WHITE decorative clay plaster 0-0,5 mm',
            color_name: '2_B',
            color_image: 'https://clay.powdev.lt/img/co/30.jpg',
            id_product_attribute: '68',
            price: 86,
            weight: '25 kg',
            m2: 16,
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '23_B',
            color_image: 'https://clay.powdev.lt/img/co/35.jpg',
            id_product_attribute: '77',
            price: 0,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '24_B',
            color_image: 'https://clay.powdev.lt/img/co/36.jpg',
            id_product_attribute: '78',
            price: 0,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          }
        ],
        priceData:[
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '12_B',
            color_image: 'https://clay.powdev.lt/img/co/33.jpg',
            id_product_attribute: '75',
            price: 54.545455,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'WHITE decorative clay plaster 0-0,5 mm',
            color_name: '2_B',
            color_image: 'https://clay.powdev.lt/img/co/30.jpg',
            id_product_attribute: '68',
            price: 86,
            weight: '25 kg',
            m2: 16,
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '23_B',
            color_image: 'https://clay.powdev.lt/img/co/35.jpg',
            id_product_attribute: '77',
            price: 0,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '24_B',
            color_image: 'https://clay.powdev.lt/img/co/36.jpg',
            id_product_attribute: '78',
            price: 0,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          }
        ],
      }
    },
    {
      objectId: 1,
      objectName: "Bathroom",
      object: {
        coloursOnCanvas:[
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '12_B',
            color_image: 'https://clay.powdev.lt/img/co/33.jpg',
            id_product_attribute: '75',
            price: 54.545455,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'WHITE decorative clay plaster 0-0,5 mm',
            color_name: '2_B',
            color_image: 'https://clay.powdev.lt/img/co/30.jpg',
            id_product_attribute: '68',
            price: 86,
            weight: '25 kg',
            m2: 16,
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '23_B',
            color_image: 'https://clay.powdev.lt/img/co/35.jpg',
            id_product_attribute: '77',
            price: 0,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          }
        ],
        priceData:[
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '12_B',
            color_image: 'https://clay.powdev.lt/img/co/33.jpg',
            id_product_attribute: '75',
            price: 54.545455,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'WHITE decorative clay plaster 0-0,5 mm',
            color_name: '2_B',
            color_image: 'https://clay.powdev.lt/img/co/30.jpg',
            id_product_attribute: '68',
            price: 86,
            weight: '25 kg',
            m2: 16,
            visible: true
          },
          {
            id_product: 72451,
            product_name: 'BALTAS apdailinis molio tinkas 0-0,5 mm',
            color_name: '23_B',
            color_image: 'https://clay.powdev.lt/img/co/35.jpg',
            id_product_attribute: '77',
            price: 0,
            weight: '25 kg',
            m2: '1.4',
            visible: true
          }
        ],
      }
    },
  ],
  
  // userObjects: [
  // ],

  selectedObjectId: 0,
  selectedObjectName: "Bedroom",

  isOpenConfirmModal: false,
  isOpenTemplateModal: false,
  isOpenCanvasItemConfigModal: false,
  isOpenCreatePaletModal: false,
  isOpenUpdatePaletModal: false,
  downloadPdf: false,
  isSelectedObject: false,

  confirmModalAction: {},
  toast: {
    isOpen: false,
    status: "",
    message: ""
  },

  imageBaseUrl:'',
  assetsPath: '',

  isLoggedIn: 0,
  customerId: 0,
  language: 'en',

  colours:[],
  userColours:{},
  coloursOnCanvas:[],
  priceData:[],
  updatedColour: {
    status: false,
    from: {},
    to: {},
    order: 0
  }
}

export default function reducer(state = initState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.IS_OPEN_CONFIRM_MODAL:
        draft.isOpenConfirmModal = !draft.isOpenConfirmModal;
        break;

      case actions.IS_OPEN_CREATE_PALET_MODAL:
        draft.isOpenCreatePaletModal = !draft.isOpenCreatePaletModal;
        break;

      case actions.IS_OPEN_UPDATE_PALET_MODAL:
        draft.isOpenUpdatePaletModal = !draft.isOpenUpdatePaletModal;
        break;
        

      case actions.IS_OPEN_TEMPLATE_MODAL:
        draft.isOpenTemplateModal = !draft.isOpenTemplateModal;
        break;

      case actions.IS_OPEN_CANVAS_ITEM_CONFIG_MODAL:
        draft.isOpenCanvasItemConfigModal = !draft.isOpenCanvasItemConfigModal;
        break;

      case actions.GET_COLOURS_REQUEST_SUCCESS: {
        // if(action.payload.products.length > 0) {
          draft.colours = convertAllProductsToColourArray(action.payload.products);
        //}
      }
      break;

      case actions.CREATE_USER_COLOURS: {
        draft.userColours = {
          ...draft.userColours,
          ...action.payload
        };
      }
      break;

      case actions.ADD_COLOUR_ON_CANVAS: {
        const selectedObject = draft.userObjects.find(obj => obj.objectId == draft.selectedObjectId);

        if(!draft.coloursOnCanvas.some(item => item.id_product_attribute === action.payload.id_product_attribute)) {
          draft.coloursOnCanvas.push(action.payload);
          if(selectedObject){
            selectedObject.object.coloursOnCanvas = [...draft.coloursOnCanvas];
          }
        }
        if(!draft.priceData.some(item => item.id_product_attribute === action.payload.id_product_attribute)) {
          draft.priceData.push(action.payload);
          if(selectedObject){
            selectedObject.object.priceData = [...draft.priceData];
          }
        }

      }
      break;

      case actions.CONFIRM_MODAL_ACTION_DEFINE: {
        draft.confirmModalAction = { ...action.payload };
      }
      break;

      case actions.REMOVE_COLOUR_0N_CANVAS: {
        const colours = [...draft.coloursOnCanvas].filter((item) => item.id_product_attribute !== action.payload);
        draft.coloursOnCanvas = [...colours];

        const priceData = [...draft.priceData].filter((item) => item.id_product_attribute !== action.payload);
        draft.priceData = [...priceData];

        const selectedObject = draft.userObjects.find(obj => obj.objectId == draft.selectedObjectId);
        if (selectedObject) {
          const _userObjects= draft.userObjects.map(obj => {
            if (obj.objectId === draft.selectedObjectId) {
              return {
                ...obj,
                object:{
                  coloursOnCanvas: colours,
                  priceData: priceData
                }
              }
            }
            return obj;
          });
          draft.userObjects = _userObjects;
        }

      }
      break;

      // case actions.REMOVE_COLOUR_0N_CANVAS: {
      //   draft.coloursOnCanvas = [...action.payload];
      // }
      // break;

      case actions.UPDATED_COLOUR_DEFINE: {
        draft.updatedColour = {
          status: false,
          order: action.payload.order,
          from: (draft.colours.filter((item) => item.id_product_attribute === action.payload.from))[0],
          to: (draft.colours.filter(item => item.id_product_attribute === action.payload.to))[0],
        }
      }
      break;

      case actions.UPDATE_TO: {
        const initOrder = state.coloursOnCanvas.findIndex((item) => item.id_product_attribute === draft.updatedColour.from.id_product_attribute);
        draft.updatedColour = {
          ...draft.updatedColour,
          to: action.payload,
          order: initOrder
        }
      }
      break;

      case actions.UPDATE_ORDER_OF_UPDATED_COLOUR: {
        draft.updatedColour = {
          ...draft.updatedColour,
          order: action.payload,
        }
      }
      break;

      case actions.UPDATE_STATUS_OF_UPDATED_COLOUR: {
        draft.updatedColour = {
          ...draft.updatedColour,
          status: action.payload
        }
      }
      break;

      case actions.UPDATE_USER_COLOURS: {
        let cloneUserColours = [ ...draft.coloursOnCanvas ].map(item => {
          if(item.id_product_attribute === draft.updatedColour.from.id_product_attribute) {
            return {
              ...item,
              ...draft.updatedColour.to
            }
          }
          return item;
        });

        let priceData = [ ...draft.priceData ].map(item => {
          if(item.id_product_attribute === draft.updatedColour.from.id_product_attribute) {
            return {
              ...item,
              ...draft.updatedColour.to,
            }
          }
          return item;
        });

        // change order
        const fromIndex = cloneUserColours.findIndex(item => item.id_product_attribute === draft.updatedColour.to.id_product_attribute);
        const fromData = cloneUserColours[fromIndex];
        const toData = cloneUserColours[draft.updatedColour.order];
        cloneUserColours[fromIndex] = toData;
        cloneUserColours[draft.updatedColour.order] = fromData;

        draft.coloursOnCanvas = [...cloneUserColours];
        draft.priceData = [...priceData];
      }
      break;

      case actions.UPDATE_VISIBILITY_ON_CANVAS: {
        let coloursOnCanvas = [...draft.coloursOnCanvas].map(item => {
          if(item.id_product_attribute === action.payload) {
            return {
              ...item,
              visible: !item.visible
            }
          }
          return item;
        });

        draft.coloursOnCanvas = [...coloursOnCanvas];
      }
      break;

      case actions.UPDATE_SIZE:{
        let priceData = [ ...draft.priceData ].map(item => {
            return {
              ...item,
              m2: action.payload.size[item.id_product_attribute],
              price: action.payload.price[item.id_product_attribute]
            }
        });

        draft.priceData = [...priceData];

        const selectedObject = draft.userObjects.find(obj => obj.objectId == draft.selectedObjectId);

        if(selectedObject){
          selectedObject.object.priceData = priceData;
        }
    
      }
      break;

      case actions.SAVE_USER_COLOURS: {
        draft.userColours = action.payload;
      }
      break;

      case actions.SET_USER_INFO: {
        draft.isLoggedIn = action.payload.isLoggedIn;
        draft.customerId = action.payload.customerId;
      }
      break;

      case actions.INIT_USER_DATA: {
        // if(draft.isLoggedIn === 1) {
          Object.assign(draft, action.payload);
        // }
      }
      break;

      case actions.GET_OBJECTS_REQUEST_SUCCESS: {
        if(action.payload.length) {
          draft.userObjects = [...action.payload];
          // Object.assign(draft, JSON.parse(action.payload.length[0]));

          // coloursOnCanvas:[],
          // priceData:[],
          // updatedColour: {
          //   status: false,
          //   from: {},
          //   to: {},
          //   order: 0
          // }

          // const selectedRoom = _objects.find(obj => obj.objectId.toString() === selectedId);
          // console.log('Selected room object:', selectedRoom);
        }
      }
      break;

      case actions.SET_LANGUAGE: {
        draft.language = action.payload;
      }
      break;

      case actions.SET_ASSETS_PATH: {
        draft.assetsPath = action.payload;
      }
      break;

      case actions.OPEN_TOAST: {
        //console.log("this is payload", action.payload)
        if(action.payload) {
          draft.toast = {
            isOpen: true,
            status: action.payload.status,
            message: action.payload.message
          };
        }
      }
      break;

      case actions.CLOSE_TOAST: {
        draft.toast = {
          isOpen: false,
          status: "",
          message: ""
        };
      }
      break;

      case actions.SELECT_OBJECT: {
        const selectedObject = [...draft.userObjects].find(obj => obj.objectId == action.payload);

        if (selectedObject) {
          // draft.selectedObjectId = selectedObject.objectId;
          // draft.selectedObjectName = selectedObject.objectName;
          draft.isSelectedObject = true;
          draft.selectedObjectId = action.payload;
          draft.coloursOnCanvas = selectedObject.object.coloursOnCanvas || [];
          draft.priceData = selectedObject.object.priceData || [];
          draft.selectedObjectName = selectedObject.objectName;
          // draft.userColours = selectedObject.userColours;

          // For debug:
          console.log('Selected object:', JSON.parse(JSON.stringify(selectedObject))); // clean clone
        }
      }
      break;

      case actions.IS_SELECTED_OBJECT: {
        draft.isSelectedObject = false;
      }
      break;

      default:
        break;
    }
  });
}