
const validatorConfig = {
  firstName: {
    isRequired: {
      message: 'First name field is required',
    },
  },
  secondName: {
    isRequired: {
      message: 'Second name field is required',
    },
  },
  email: {
    isRequired: {
      message: 'Email is required',
    },
    isEmail: {
      message: 'Email field is invalid',
    },
  },
  password: {
    isRequired: {
      message: 'Password field is required',
    },
    isCapitalSymbol: {
      message: 'Password must contain at least 1 capital letter',
    },
    isContainDigit: {
      message: 'Password must contain at least 1 digit',
    },

    min: {
      value: 8,
      message: 'Password must contain at least 8 characters',
    },
  },
};

export default validatorConfig;
