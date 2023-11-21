
const validatorConfig = {
  roomNumber: {
    isRequired: {
      message: 'Room number field is required',
    },
  },
  price: {
    isRequired: {
      message: 'Price per night field is required',
    },
    isValidInterval: {
      message: 'Enter price from 0 to 500',
      value: [0, 500],
    },
  },
};

export default validatorConfig;
