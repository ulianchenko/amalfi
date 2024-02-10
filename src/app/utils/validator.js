import dayjs from 'dayjs';

export function validator(data, validatorConfig) {
  const errors = {};

  function validate(validateMethod, fieldData, config) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof fieldData === 'boolean') {
          statusValidate = !fieldData;
        } else {
          statusValidate = String(fieldData).trim() === '';
        }
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(fieldData);
        break;
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(fieldData);
        break;
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(fieldData);
        break;
      }
      case 'min': {
        if (config.value) {
          statusValidate = fieldData.length < config.value;
        }
        break;
      }
      case 'isValidInterval': {
        if (Array.isArray(config.value)) {
          statusValidate = !(Number(fieldData) >= config.value[0] && Number(fieldData) <= config.value[1]);
        }
        break;
      }
      case 'isValidDate': {
        statusValidate = !dayjs(fieldData).isValid();
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  //         email
  for (const fieldName in data) {
    for (const validateMethod in validatorConfig[fieldName]) {
      const error = validate(validateMethod, data[fieldName], validatorConfig[fieldName][validateMethod]);
      //            validate(isRequired,     '',              {message: 'e-mail is required'}
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors; // {email: {message: 'e-mail is required'}}
}