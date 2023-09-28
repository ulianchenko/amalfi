import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { getAuthErrors, signIn } from '../../../../store/users';
import Button from '../../../common/Button/Button';
import { InputField } from '../../../common/Fields';
import withPassword from '../../../common/Fields/HOC/withPassword';
import validatorConfig from './validatorConfig';

const initialData = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );
  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(data)) {
      const redirect = location.state ? location.state.from.pathname : '/';
      // dispatch(signIn({ payload: data, redirect }, navigate));
      dispatch(signIn({ payload: data, redirect }));
      navigate(redirect || '/');
      handleResetForm(e);
    }
  };

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name='email' label='E-mail' autoFocus />
        <InputFieldWithPassword name='password' label='Password' type='password' />
        <Button onClick={handleSubmit} fullWidth type='submit' disabled={enterError ? true : false}>
          Login
        </Button>
      </Form>
      {loginError && <p className='form__enter-error'>{loginError}</p>}
    </>
  );
};

export default LoginForm;
