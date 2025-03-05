import React from 'react';

import './Room.css';
import saveButton from '../../assets/images/save-button.svg';

function Room() {
  return (
    <div className='room d-flex space-between m-top m-bottom normal-font-style p-bottom'>
      <div>Rooms</div>
      <div className="room-select-button-container d-flex">
        <div className='room-select-container'>
          <select className='room-select'>
            <option>Bedroom</option>
          </select>
        </div>
        <div className="button">
          <img src={saveButton} alt='button' />
        </div>
      </div>
    </div>
  );
}

export default Room;