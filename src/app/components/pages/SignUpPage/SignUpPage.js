import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import RegisterForm from '../../ui/forms/RegisterForm';

const SignUpPage = () => {
  return (
    <>
      <h1 className='visually-hidden'>Amalfi hotel Registration</h1>
      <div className='login-form__wrapper'>
        <Paper elevation={3} className='form-card login-form__card'>
          <h2>Registration</h2>
          <RegisterForm />
          <div className='login-form__footer'>
            <span>Already have an account on Amalfi hotel?</span>
            <Link to='./signIn' className='login-form__link'>
              <Button variant='outlined' size='small'>
                Login
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default SignUpPage;
