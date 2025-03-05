import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import statusAction from "../../../redux/status/actions";

import './ConfirmModal.css';
import mdClose from '../../../assets/images/md-close.svg';

Modal.setAppElement('#root');

function ConfirmModal() {
  const isOpen = useSelector((state) => state.Status.isOpenConfirmModal);

  const dispatch = useDispatch();
  const isOpenConfirmModal = () => {
    dispatch(statusAction.isOpenConfirmModal(statusAction.IS_OPEN_CONFIRM_MODAL));
  }

  const action = {
    type: useSelector((state) => state.Status.confirmModalAction.type),
    payload: useSelector((state) => state.Status.confirmModalAction.payload)
  }

  const confirmModalAction = () => {
    dispatch(action);
    isOpenConfirmModal();
  }

  return (
    <div className='confirm-modal'>
      <Modal
        isOpen={isOpen}
        // onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            width: '386px',
            height: '202px',
            margin: 'auto',
            borderRadius: '0', // No border radius
            padding: '0',
            textAlign: 'center'
          }
        }}
      >
        <div className='cm-header'>
          <div className='cm-header-title'>DELETE ITEM?</div>
          <div className='cm-header-close' onClick={isOpenConfirmModal}>
            <img src={mdClose} alt='close' />
          </div>
        </div>
        <div className='cm-body'>Are you sure you want to delete this item?</div>
        <div className='cm-footer'>
          <div>
            <div className='cm-footer-yes' onClick={confirmModalAction}>Yes</div>
          </div>
          <div>
            <div className='cm-footer-no' onClick={isOpenConfirmModal}>No</div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
