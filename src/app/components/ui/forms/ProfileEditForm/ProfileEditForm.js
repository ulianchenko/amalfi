import { TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, useForm } from '../../../../hooks';
import { getCurrentUserData, updateUserData } from '../../../../store/users';
import Button from '../../../common/Button';
import { DatePickerField, InputField, RadioGroupField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
];

const ProfileEditForm = () => {
  const navigate = useNavigate();
  const currentUserData = useSelector(getCurrentUserData());

  const initialData = {
    firstName: currentUserData?.firstName || '',
    secondName: currentUserData?.secondName || '',
    gender: currentUserData?.gender || 'male',
    birthYear: currentUserData?.birthYear || Date.now(),
    role: currentUserData?.role || 'user',
  };

  const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, validatorConfig);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(updateUserData(data));
      navigate(-1);
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
        <InputField autoFocus name='firstName' label='First name' />
        <InputField name='secondName' label='Second name' />
        <RadioGroupField name='gender' items={genderItems} />
        <DatePickerField
          onChange={handleInputChange}
          value={data.birthYear}
          openTo='year'
          mask='__.__.____'
          label='Birth date'
          name='birthYear'
          minDate={new Date('1950-01-01')}
          renderInput={params => (
            <TextField {...params} {...(errors?.birthYear && { error: true, helperText: errors?.birthYear })} />
          )}
        />
        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Update
        </Button>
      </Form>
    </>
  );
};

export default ProfileEditForm;
