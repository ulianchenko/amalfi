import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '../../common/Button';
import Footer from '../../common/Footer';
import Header from '../../common/Header';

const CheckoutReturnPage = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  const navigate = useNavigate();

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

  const handleGoHome = () => {
    navigate('/');
  };

  if (status === 'open') {
    navigate('/checkout');
  }

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
        <h2 className="checkoutReturnPage__title">Successful checkout</h2>
        <section className="checkoutReturnPage__success" id="success">
          <p>
            We appreciate your business! A confirmation email will be sent to your email. If you have any questions, please email
            <a href="mailto:orders@example.com">orders@example.com</a>.
          </p>
        </section>
        <Button className="checkoutReturnPage__button" onClick={handleGoHome}>
          Home page
        </Button>
      </main>
    </Container>
    <Footer />
  </>
  )

  // return <CircularProgress />;

};

export default CheckoutReturnPage;
