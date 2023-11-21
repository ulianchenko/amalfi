import React from 'react';

const CheckboxList = ({ children, onChange, data }) => {
  return (
    <ul className='checkbox-list'>
      {React.Children.map(children, child => {
        const item = child;
        const config = {
          onChange,
          value: (data && data[item.props.name]) || '',
          ...item.props,
        };
        return <li className='checkbox-list__item'>{React.cloneElement(item, config)}</li>;
      })}
    </ul>
  );
};

export default CheckboxList;
