
const validatorConfig = {
  firstName: {
    isRequired: {
      message: '"First name" field is required',
    },
  },
  secondName: {
    isRequired: {
      message: '"Last name" field is required',
    },
  },
  email: {
    isRequired: {
      message: '"E-mail" field is required',
    },
    isEmail: {
      message: '"E-mail" field is incorrect',
    },
  },
  password: {
    isRequired: {
      message: '"Password" field is required',
    },
    isCapitalSymbol: {
      message: 'Password should contain at least 1 capital letter',
    },
    isContainDigit: {
      message: 'Password should contain at least 1 number',
    },

    min: {
      value: 8,
      message: 'Password should contain at least 8 characters',
    },
  },
  
};

export default validatorConfig;
