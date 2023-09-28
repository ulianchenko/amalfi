
const validatorConfig = {
  email: {
    isRequired: {
      message: 'e-mail is required',
    },
    isEmail: {
      message: '"E-mail" field is incorrect',
    },
  },
  password: {
    isRequired: {
      message: '"Password" field is required',
    },
  },
};

export default validatorConfig;
