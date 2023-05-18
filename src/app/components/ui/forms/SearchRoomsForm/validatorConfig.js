const validatorConfig = {
  arrivalDate: {
    isValidDate: {
      message: 'Invalid arrival date',
    },
  },
  departureDate: {
    isValidDate: {
      message: 'Invalid departure date',
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