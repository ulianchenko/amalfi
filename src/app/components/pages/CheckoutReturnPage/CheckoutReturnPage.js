import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';
import Button from '../../common/Button';
import Backdrop from '../../common/Backdrop';
import Footer from '../../common/Footer';
import Header from '../../common/Header';

const CheckoutReturnPage = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { search } = useLocation();

  // useEffect(() => {
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const sessionId = urlParams.get('session_id');

  //   fetch(`http://localhost:8080/session-status?session_id=${sessionId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStatus(data.status);
  //       setCustomerEmail(data.customer_email);
  //     });
  // }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);

    if (search.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (search.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  // if (status === 'open') {
  //   navigate('/checkout');
  // }

  // if (status === 'complete') {
  //   return (
  //     <>
  //     <Header />
  //     <Container>
  //       <main className="checkoutReturnPage__main">
  //         <h2 className="checkoutReturnPage__title">Successful checkout</h2>
  //         <section className="checkoutReturnPage__success" id="success">
  //           <p>
  //             We appreciate your business! A confirmation email will be sent to{" "}
  //             {customerEmail}. If you have any questions, please email{" "}
  //             <a href="mailto:orders@example.com">orders@example.com</a>.
  //           </p>
  //         </section>
  //         <Button className="checkoutReturnPage__button" onClick={handleGoHome}>
  //           Home page
  //         </Button>
  //       </main>
  //     </Container>
  //     <Footer />
  //   </>
  //   )
  // }

  return (
    <>
      <Header />
      <Container>
        <main className="checkoutReturnPage__main">
          {
            message ? (
              <>
              <h2 className="checkoutReturnPage__title">Checkout confirmation message</h2>
              {/* <section className="checkoutReturnPage__success" id="success"> */}
              <section className="checkoutReturnPage__message">
                <p>
                  {/* We appreciate your business! A confirmation email will be sent to your email. If you have any questions, please email
                  <a href="mailto:orders@example.com">orders@example.com</a>. */}
                  {message}
                </p>
              </section>
              <Button className="checkoutReturnPage__button" onClick={handleGoHome}>
                Home page
              </Button>
              </>

            ) : (
              <Backdrop open={true} />
            )
          }
        </main>
      </Container>
      <Footer />
  </>
  )

  // return <CircularProgress />;

};

export default CheckoutReturnPage;
