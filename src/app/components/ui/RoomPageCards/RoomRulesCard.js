import React from 'react';

const RoomRulesCard = () => {
  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>Rules</h3>
      <ul className='bullet-list'>
        <li className='bullet-list__item'>Pets are not allowed</li>
        <li className='bullet-list__item'>Parties and events are not allowed</li>
        <li className='bullet-list__item'>Check-in after 13:00 and check-out before 12:00</li>
      </ul>
    </div>
  );
};

export default RoomRulesCard;
