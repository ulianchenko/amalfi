const validatorConfig = {
  arrivalDate: {
    isValidDate: {
      message: 'Invalid date',
    },
  },
  departureDate: {
    isValidDate: {
      message: 'Invalid date',
    },
  },
  adults: {
    min: {
      message: 'Should be minimum 1 adult guest',
      value: 2,
    },
  },
};

export default validatorConfig;