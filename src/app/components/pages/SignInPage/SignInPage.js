import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import LoginForm from '../../ui/forms/LoginForm';

const SignInPage = () => {
  return (
    <>
      <h1 className='visually-hidden'>Amalfi hotel Login to your personal account</h1>
      <div className='login-form__wrapper'>
        <Paper elevation={3} className='form-card login-form__card'>
          <h2>Login</h2>
          <LoginForm />
          <div className='login-form__footer'>
            <span>Don't have an account on Amalfi?</span>
            <Link to='./signUp' className='login-form__link'>
              <Button variant='outlined' size='small'>
                Registration
              </Button>
            </Link>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default SignInPage;
