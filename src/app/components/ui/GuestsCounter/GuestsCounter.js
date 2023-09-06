import React from 'react';
import Counter from '../../common/Counter';
import declOfNum from '../../../utils/declOfNum';

export const getGuestsLabel = (adults, children, babies) => {
  const guests = [Number(adults), Number(children), Number(babies)];
  const countGuests = guests.reduce((acc, cur) => acc + cur, 0);
  const countBabies = Number(babies);

  const guestsStr = `${countGuests} ${declOfNum(countGuests, ['guest', 'guests'])}`;
  const babiesStr = `${countBabies} ${declOfNum(countBabies, ['baby', 'babies'])}`;

  if (countGuests > 0 && countBabies > 0) {
    return `${guestsStr} ${babiesStr}`;
  }

  return countGuests > 0 ? guestsStr : 'How many guests';
};

const GuestsCounter = ({ data, onChange }) => {
  const { adults, children, babies } = data;

  return (
    <>
      <p className='guests-label'>{getGuestsLabel(adults, children, babies)}</p>
      <Counter name='adults' label='Adults' min={1} max={10} onChange={onChange} value={+adults} />
      <Counter name='children' label='Children' min={0} max={10} onChange={onChange} value={children} />
      <Counter name='babies' label='Babies' min={0} max={10} onChange={onChange} value={+babies} />
    </>
  );
};

export default React.memo(GuestsCounter);
