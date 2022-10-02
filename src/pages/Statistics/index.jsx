import React from 'react';
import Popup from 'reactjs-popup';

const Statistics = () => (
  <Popup
    trigger={<button className="button"> Trigger 1 </button>}
    position="right"
    nested
  >
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolor
      nulla animi, natus velit assumenda deserunt molestias
      <Popup
        trigger={<button className="button"> Trigger 2 </button>}
        position="right"
        nested
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          dolor nulla animi, natus velit assumenda deserunt
          <Popup
            trigger={<button className="button"> Trigger 3 </button>}
            position="right"
            nested
          >
            <span> Popup content </span>
          </Popup>
        </div>
      </Popup>
    </div>
  </Popup>
);

export default Statistics