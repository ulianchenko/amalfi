import React, { useCallback } from 'react';
import { useFiltersQuery } from '../../../../hooks';
import Button from '../../../common/Button';
import { Checkbox, CheckboxList, DateOfStayField, RangeSliderField } from '../../../common/Fields';
import GuestsCounter from '../../GuestsCounter';
import RoomsFilterList from './RoomsFiltersList';

const oneDayMs = 86400000;

const initialState = {
  arrivalDate: Date.now(),
  departureDate: Date.now() + oneDayMs,
  adults: 1,
  children: 0,
  babies: 0,
  price: [0, 500],
  canSmoke: false,
  canPets: false,
  canInvite: false,
  hasWideCorridor: false,
  hasDisabledAssistant: false,
  hasWifi: false,
  hasConditioner: false,
  hasWorkSpace: false,
};

const RoomsFilter = ({ onReset }) => {
  const { searchFilters, handleChangeFilter, handleResetSearchFilters } = useFiltersQuery();

  const handleResetFilters = useCallback(
    e => {
      e.preventDefault();
      handleResetSearchFilters();
      onReset();
    },
    [handleResetSearchFilters, onReset]
  );

  const data = { ...initialState, ...searchFilters };

  return (
    <section className='filters__wrapper'>
      <h2 className='visually-hidden'>Hotel room search</h2>
      <RoomsFilterList data={data} handleChange={handleChangeFilter}>
        <DateOfStayField data={data} onChange={handleChangeFilter} title='Date of stay' />
        <GuestsCounter data={data} onChange={handleChangeFilter} />
        <RangeSliderField
          label='Price range'
          description='One night stay in the room cost'
          name='price'
          onChange={handleChangeFilter}
          min={0}
          max={500}
        />
        <CheckboxList title='Conveniences'>
          <Checkbox label='Wi-Fi' name='hasWifi' />
          <Checkbox label='Air conditioning' name='hasConditioner' />
          <Checkbox label='Workspace' name='hasWorkSpace' />
        </CheckboxList>
        <CheckboxList title='Accommodation conditions'>
          <Checkbox label='Pets are allowed' name='canPets' />
          <Checkbox label='Smoking is allowed' name='canSmoke' />
          <Checkbox label='Guests can be invited (up to 10 people)' name='canInvite' />
        </CheckboxList>
        <CheckboxList title='Accessibility'>
          <Checkbox
            label='Wide corridor'
            name='hasWideCorridor'
            labelDetails='The corridor width is not less than 90 cm'
          />
          <Checkbox
            label='Assistant for the Disabled'
            name='hasDisabledAssistant'
            labelDetails='An assistant will meet you on the first floor and escort you to your room'
          />
        </CheckboxList>
        <Button type='button' onClick={handleResetFilters} fullWidth>
          Reset Filters
        </Button>
      </RoomsFilterList>
    </section>
  );
};

export default React.memo(RoomsFilter);
