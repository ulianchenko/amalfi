import { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
// import queryString from 'query-string';
import { Container, Divider } from '@mui/material';
import Button from '../../common/Button';
import Backdrop from '../../common/Backdrop';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import httpService from '../../../services/http.service';
// import queryString from 'query-string';

const QuickbooksRedirectPage = () => {
  // const [status, setStatus] = useState(null);
  // const [customerEmail, setCustomerEmail] = useState('');
  const [message, setMessage] = useState('QuickbooksRedirectPage');
  const [showGetInvoiceBtn, setShowGetInvoiceBtn] = useState(true);
  const [showInvoiceLink, setShowInvoiceLink] = useState('');
  // const { search } = useLocation();
  // const {code, realmId} = queryString.parse(search);
  // console.log('code: ', code);
  // console.log('realmId: ', realmId);


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
  const handleGetInvoice = async () => {
    const { data } = await httpService.get('getInvoiceInfo/');
    // const { data } = await httpService.get('getCompanyInfo/');
    const link = data.content.Invoice.InvoiceLink.replace('https://developer.intuit.com/comingSoonview/', 'https://connect.intuit.com/t/')
    // console.log(data.content.Invoice.InvoiceLink.replace('https://developer.intuit.com/comingSoonview/', 'https://connect.intuit.com/t/'));
    console.log('link: ', link);
    setShowGetInvoiceBtn(false);
    setShowInvoiceLink(link);
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
        <main className="quickbooksRedirectPage__main">
              <>
                <h2 className="quickbooksRedirectPage__title">Quickbooks Redirect page</h2>
                <section className="quickbooksRedirectPage__message">
                  <p>
                    {message}
                  </p>
                </section>
                <Button className="quickbooksRedirectPage__button" onClick={handleGoHome}>
                  Home page
                </Button>
                <Divider variant='fullWidth' className='footer-divider' />
                {
                  showGetInvoiceBtn &&
                  <Button className="quickbooksRedirectPage__button" onClick={handleGetInvoice}>
                    Get invoice
                  </Button>
                }
                <Divider variant='fullWidth' className='footer-divider' />
                {
                  showInvoiceLink.length > 0 &&
                  <a target="_blank" href={showInvoiceLink}>Payment link</a>
                }
              </>
        </main>
      </Container>
      <Footer />
  </>
  )
};

export default QuickbooksRedirectPage;
