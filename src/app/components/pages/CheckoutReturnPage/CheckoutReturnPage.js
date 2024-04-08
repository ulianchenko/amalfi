import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
// import queryString from 'query-string';
import { Container } from '@mui/material';
import Button from '../../common/Button';
import Backdrop from '../../common/Backdrop';
import Footer from '../../common/Footer';
import Header from '../../common/Header';

const CheckoutReturnPage = () => {
  // const [status, setStatus] = useState(null);
  // const [customerEmail, setCustomerEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  // const { search } = useLocation();
  // const searchParsed = queryString.parse(search, { parseBooleans: true });
  const { state } = useLocation();
  // console.log(state);

  useEffect(() => {

    if (!state) {
      navigate('/404', { replace: true });
    }
    // if (searchParsed.success) {
    if (state.success === 'true') {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    // if (searchParsed.canceled) {
    if (state.success === 'false') {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      <Container>
        <main className="checkoutReturnPage__main">
          {
            message ? (
              <>
                <h2 className="checkoutReturnPage__title">Checkout confirmation message</h2>
                <section className="checkoutReturnPage__message">
                  <p>
                    {message}
                  </p>
                </section>
                <Button className="checkoutReturnPage__button" onClick={handleGoHome}>
                  Home page
                </Button>
              </>

            ) : (
              // <Navigate to="/404" replace={true} />
              <Backdrop open={true} />
            )
          }
        </main>
      </Container>
      <Footer />
  </>
  )
};

export default CheckoutReturnPage;
