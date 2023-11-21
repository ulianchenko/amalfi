import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { updateRoomData } from '../../../../store/rooms';
import Button from '../../../common/Button';
import { Checkbox, CheckboxList, InputField, RadioGroupField, SelectField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

const roomType = [
  { id: 'Standard', title: 'Standard' },
  { id: 'Suite', title: 'Suite' },
];
const roomComfortsOptions = [
  { name: 'Wi-Fi', value: 'hasWifi' },
  { name: 'Workspace', value: 'hasWorkSpace' },
  { name: 'Conditioner', value: 'hasConditioner' },
];

const RoomEditForm = ({ roomData, onCloseModal }) => {
  const initialData = {
    _id: roomData?._id || 'not found',
    roomNumber: roomData?.roomNumber || '',
    type: roomData?.type || 'Standard',
    price: roomData?.price || 0,
    comforts: roomData?.comforts || [],
    canPets: roomData?.canPets || false,
    canSmoke: roomData?.canSmoke || false,
    canInvite: roomData?.canInvite || false,
    hasWideCorridor: roomData?.hasWideCorridor || false,
    hasDisabledAssistant: roomData?.hasDisabledAssistant || false,
  };

  const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, validatorConfig);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate(data)) {
      dispatch(updateRoomData(data));
      onCloseModal();
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
        <InputField name='roomNumber' label='Room number' autoFocus />
        <RadioGroupField label='Room type' name='type' items={roomType} value={roomData?.type} />
        <InputField name='price' label='Price per night' />
        <SelectField label='Comforts' name='comforts' options={roomComfortsOptions} multiple />
        <CheckboxList>
          <Checkbox label='Pets are allowed' name='canPets' />
          <Checkbox label='Smoking is allowed' name='canSmoke' />
          <Checkbox label='Guests can be invited (up to 10 people)' name='canInvite' />
        </CheckboxList>
        <CheckboxList>
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

        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Update
        </Button>
      </Form>
    </>
  );
};

export default RoomEditForm;
