import SignInPage from '../components/pages/SignInPage';
import SignUpPage from '../components/pages/SignUpPage/SignUpPage';
import { useParams } from 'react-router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Container } from '@mui/material';

const Login = () => {
  const { type } = useParams();
  return (
    <>
      <Header />
      <Container />
      {type === 'signUp' ? <SignUpPage /> : <SignInPage />}
      <Footer />
    </>
  );
};

export default Login;
