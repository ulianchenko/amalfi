import React from 'react';
import RoomsFilterItem from '../RoomsFiltersItem';

const RoomsFiltersList = ({ handleChange, data, children }) => {
  const clonedElements = React.Children.map(children, child => {
    const item = child;
    const childType = typeof item;
    let config = {};
    if (
      childType === 'object' ||
      (childType === 'function' && item.props.type !== 'submit' && item.props.type !== 'button')
    ) {
      config = {
        ...item.props,
        data,
        onChange: handleChange,
        value: data[item.props.name],
      };
    }

    return <RoomsFilterItem title={item.props.title}>{React.cloneElement(item, config)}</RoomsFilterItem>;
  });

  return <form className='filters__form'>{clonedElements}</form>;
};

export default React.memo(RoomsFiltersList);
