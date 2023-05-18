import React, { useCallback, useState } from 'react';
import { validator } from '../utils/validator';

function useForm(initialData, validateOnChange, validatorConfig) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  // const [enterError, setEnterError] = useState(null);

  const validate = useCallback(
    data => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [validatorConfig, setErrors]
  );

  const handleInputChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setData(prevState => ({
        ...prevState,
        [name]: value,
      }));
      // setEnterError(null);
      setErrors({});
      if (validateOnChange) validate({ [name]: value });
    },
    [validateOnChange, validate]
  );

  // const handleKeyDown = useCallback(event => {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //     const form = event.target.form;
  //     console.log(form);
  //     const formElements = [...form.elements].filter(
  //       el => el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'button'
  //     );
  //     console.log(formElements);
  //     const indexField = Array.prototype.indexOf.call(formElements, event.target);
  //     console.log(indexField);
  //     formElements[indexField + 1].focus();
  //   }
  // }, []);

  const handleResetForm = (event) => {
    event.preventDefault();
    setData(initialData);
    setErrors({});
  };

  return {
    data,
    setData,
    errors,
    setErrors,
    // enterError,
    // setEnterError,
    handleInputChange,
    // handleKeyDown,
    validate,
    handleResetForm,
  };
}

// function Form({ children, handleChange, data, errors, handleKeyDown, ...rest }) {
function Form({ children, handleChange, data, errors, handleKeyDown, ...rest }) {
  const clonedElements = React.Children.map(children, child => {
    // const item = child;
    const childType = typeof child;
    let config = { name: '' };
    if (
      childType === 'object' ||
      (childType === 'function' && child.props.type !== 'submit' && child.props.type !== 'button')
    ) {
      config = {
        ...child.props,
        data: data,
        onChange: handleChange,
        value: data[child.props.name],
        error: errors?.[child.props.name],
        onKeyDown: handleKeyDown,
      };
    }
    return React.cloneElement(child, config);
  });

  return (
    <form className='form' {...rest}>
      {clonedElements}
    </form>
  );
}

export { useForm, Form };
