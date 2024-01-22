// import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
// import Button from '../../common/Button';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
// import CheckoutForm from '../../ui/forms/CheckoutForm';

const CheckoutPage = () => {
  // const navigate = useNavigate();

  // const handleGoHome = () => {
  //   navigate('/');
  // };

  return (
    <>
    <Header />
    <Container>
      <main className="checkoutPage__main">
      <h2 className="checkoutPage__title">Checkout page</h2>
        {/* <CheckoutForm /> */}
        {/* <Button className="checkoutPage__button" onClick={handleGoHome}>
          Home page
        </Button> */}
      </main>
      {/* <form action="http://localhost:8080/create-checkout-session" method="POST"> */}
      {/* <form action="https://amalfi-server.onrender.com/create-checkout-session" method="POST"> */}
      <form action="https://amalfi-api.onrender.com/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
    </Container>
    <Footer />
  </>
  )
};

export default CheckoutPage;
