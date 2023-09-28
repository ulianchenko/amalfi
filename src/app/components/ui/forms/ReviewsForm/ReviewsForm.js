import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Form, useForm } from '../../../../hooks';
import { createReview } from '../../../../store/reviews';
import { getRoomById, updateRoomData } from '../../../../store/rooms';
import Button from '../../../common/Button/Button';
import { RatingField, TextAreaField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

const ReviewsForm = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const initialData = { content: '', likes: [], rating: 5 };
  const currentRoomData = useSelector(getRoomById(roomId));
  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, validatorConfig);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(data)) {
      const payload = {
        ...data,
        roomId,
      };
      const updateRoomPayload = {
        _id: currentRoomData?._id || 'not found',
        price: currentRoomData?.price || 0,
        roomNumber: currentRoomData?.roomNumber || 'not found',
        countReviews: (currentRoomData?.countReviews || 0) + 1,
        rate: Number(currentRoomData?.rate) + Number(data.rating),
      };

      dispatch(createReview(payload));
      dispatch(updateRoomData(updateRoomPayload));
      handleResetForm(e);
    }
  };

  return (
    <Form data={data} errors={errors} handleChange={handleInputChange}>
      <TextAreaField label='leave feedback' name='content' />
      <RatingField name='rating' label='Room rating:' size='large' />
      <Button onClick={handleSubmit} type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default ReviewsForm;
