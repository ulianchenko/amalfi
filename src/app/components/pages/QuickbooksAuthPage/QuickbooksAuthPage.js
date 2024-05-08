import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
// import queryString from 'query-string';
import { Container, Divider } from '@mui/material';
import Button from '../../common/Button';
import Backdrop from '../../common/Backdrop';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import httpService from '../../../services/http.service';

const QuickbooksAuthPage = () => {
  // const [status, setStatus] = useState(null);
  // const [customerEmail, setCustomerEmail] = useState('');
  const [message, setMessage] = useState('This is a QuickbooksAuthPage');
  // const [iframeSrc, setIframeSrc] = useState('');

  const navigate = useNavigate();
  // const { search } = useLocation();
  // const searchParsed = queryString.parse(search, { parseBooleans: true });
  // const { state } = useLocation();
  // console.log(state);

  // useEffect(() => {

  //   if (!state) {
  //     navigate('/404', { replace: true });
  //   }
  //   // if (searchParsed.success) {
  //   if (state.success === 'true') {
  //     setMessage("Order placed! You will receive an email confirmation.");
  //   }

  //   // if (searchParsed.canceled) {
  //   if (state.success === 'false') {
  //     setMessage(
  //       "Order canceled -- continue to shop around and checkout when you're ready."
  //     );
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [message]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleConnectQuickbooksCompany = async () => {
    const { data } = await httpService.get('quickbooks/');
    // let response = await fetch('https://appcenter.intuit.com/connect/oauth2?client_id=AB8EtwqFitQeTQfQtXr9HbCQPoYf4GQAyuIu2fNr33W1FXERXG&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=http://localhost:3000/quickbooks&state=333_redirect_state');
    // let json = await response.json();
    console.log(data);
    // console.log(data.content);
    // navigate('/quickbooksauth');
    window.location.href = data.content;
    // setIframeSrc(data.content);
    // const newWin = window.open(data.content, "quickbooks", "width=200,height=200");
    // window.open(data.content);

  };

  return (
    <>
      <Header />
      <Container>
        {/* <main className="quickbooksAuthPage__main">
          {
            message ? (
              <>
                <h2 className="quickbooksAuthPage__title">Checkout confirmation message</h2>
                <section className="quickbooksAuthPage__message">
                  <p>
                    {message}
                  </p>
                </section>
                <Button className="quickbooksAuthPage__button" onClick={handleGoHome}>
                  Home page
                </Button>
              </>

            ) : (
              // <Navigate to="/404" replace={true} />
              <Backdrop open={true} />
            )
          }
        </main> */}
        <main className="quickbooksAuthPage__main">
              <>
                <h2 className="quickbooksAuthPage__title">Quickbooks Auth page</h2>
                <section className="quickbooksAuthPage__message">
                  <p>
                    {message}
                  </p>
                </section>
                <Button className="quickbooksAuthPage__button" onClick={handleGoHome}>
                  Home page
                </Button>
                <Divider variant='fullWidth' className='footer-divider' />
                <Button className="quickbooksAuthPage__button" onClick={handleConnectQuickbooksCompany}>
                  Connect quickbooks company
                </Button>
                {/* {iframeSrc && <iframe src={iframeSrc} id="quickbooksIframe" style={{ height: '500px', width: '400px' }}></iframe>} */}
              </>
        </main>
      </Container>
      <Footer />
  </>
  )
};

export default QuickbooksAuthPage;
