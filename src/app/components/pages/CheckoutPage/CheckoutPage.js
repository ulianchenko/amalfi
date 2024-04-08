import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Container } from '@mui/material';
import Button from '../../common/Button';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import configFile from '../../../config.json';
import generateCheckoutSession from '../../../utils/generateCheckoutSession';
import paymentService from '../../../services/payment.service';
// import useCheckoutSession from '../../../hooks/useCheckoutSession';
// import monerisPreloadRequest from '../../../mockData/monerisPreloadRequest.json';

// // For checkout with Moneris payment set moneris to true
// const monerisGateway = configFile.paymentGateway === 'moneris';

// const getPaymentTicket = async () => {
//   // let preloadRequest = {
//   //   store_id: "moneris",
//   //   api_token: "hurgle",
//   //   checkout_id: "chkt5BF66neris",
//   //   txn_total: "452.00",
//   //   environment: "qa",
//   //   action: "preload",
//   //   order_no: "",
//   //   cust_id: "chkt - cust - 0303",
//   //   dynamic_descriptor: "dyndesc",
//   //   language: "en",
//   //   cart: {
//   //     items: [
//   //       {
//   //         url: "https://example.com/examples/item1.jpg",
//   //         description: "One item",
//   //         product_code: "one_item",
//   //         unit_cost: "100.00",
//   //         quantity: "1",
//   //       },
//   //       {
//   //         url: "https://example.com/examples/item2.jpg",
//   //         description: "Two item",
//   //         product_code: "two_item",
//   //         unit_cost: "200.00",
//   //         quantity: "1",
//   //       },
//   //       {
//   //         url: "https://example.com/examples/item3.jpg",
//   //         description: "Three item",
//   //         product_code: "three_item",
//   //         unit_cost: "100.00",
//   //         quantity: "1",
//   //       },
//   //     ],
//   //     subtotal: "400.00",
//   //     tax: {
//   //       amount: "52.00",
//   //       description: "Taxes",
//   //       rate: "13.00",
//   //     },
//   //   },
//   //   contact_details: {
//   //     first_name: "bill",
//   //     last_name: "smith",
//   //     email: "test@moneris.com",
//   //     phone: "4165551234",
//   //   },
//   //   shipping_details: {
//   //     address_1: "1 main st",
//   //     address_2: "Unit 2012",
//   //     city: "Toronto",
//   //     province: "ON",
//   //     country: "CA",
//   //     postal_code: "M1M1M1",
//   //   },
//   //   billing_details: {
//   //     address_1: "1 main st",
//   //     address_2: "Unit 2000",
//   //     city: "Toronto",
//   //     province: "ON",
//   //     country: "CA",
//   //     postal_code: "M1M1M1",
//   //   },
//   // };
//   // console.log(JSON.stringify(preloadRequest));

//   const response = await fetch(`${configFile.apiEndPoint}/moneris-ticket`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     // body: JSON.stringify(preloadRequest),
//     body: monerisPreloadRequest,
//   });

//   const result = await response.json();
//   return result;
// };

// const getPaymentReceipt = async (ticket) => {
//   const { store_id, api_token, checkout_id, environment, action } = configFile.moneris;
//   // const receiptRequest = {
//   //   store_id,
//   //   api_token,
//   //   checkout_id,
//   //   ticket,
//   //   environment,
//   //   action,
//   // };

//   const response = await fetch(`${configFile.apiEndPoint}/moneris-receipt`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     body: JSON.stringify({ store_id, api_token, checkout_id, environment, action, ticket }),
//   });

//   const result = await response.json();
//   return result;
// };

const CheckoutPage = () => {

  // Check if payment gateway is "moneris"
  // const monerisGateway = configFile.paymentGateway === 'moneris';
  const navigate = useNavigate();
  const { state } = useLocation();
  // const { isPaymentComplete, paymentReceipt } = useCheckoutSession(state.totalPrice || 0);
  // const { isPaymentComplete, paymentReceipt } = useCheckoutSession();

  useEffect(() => {
    if (configFile.monerisGateway) {
      // window.onload = function () {
      //   console.log("start");
      //   window.onbeforeunload = function (e) {
      //     e = e || window.event;
      //     var msg = {};
      //     msg["handler"] = "page_closed";
      //     msg["response_code"] = "001";
      //     window.parent.postMessage(JSON.stringify(msg), "*");
      //   };
      // };

      // const moneris = window.monerisCheckout;

      // const { store_id, api_token, checkout_id, environment, action, routes } = configFile.moneris;

      // async function monerisPayment() {
      //   // if (moneris) {
      //     var myCheckout = new moneris();

      //     myCheckout.setMode("qa");
      //     myCheckout.setCheckoutDiv("monerisCheckout");

      //     myCheckout.setCallback("page_loaded", (res) => {
      //       // console.log("page_loaded: ", res)
      //     }
      //     );
      //     myCheckout.setCallback("cancel_transaction", (res) =>
      //       console.log("cancel_transaction: ", res)
      //     );
      //     myCheckout.setCallback("error_event", (res) =>
      //       console.log("error_event: ", res)
      //     );
      //     myCheckout.setCallback("payment_receipt", (res) => {
      //       // console.log("payment_receipt: ", res)
      //     }
      //     );

      //     // const ticket = await getPaymentTicket();
      //     const ticket = await paymentService.create({
      //       endpoint: routes.ticket,
      //       data: monerisPreloadRequest
      //     });

      //     myCheckout.startCheckout([ticket]);

      //     myCheckout.setCallback("payment_complete", async (res) => {
      //       // const receipt = await getPaymentReceipt(ticket);
      //       const receipt = await paymentService.create({
      //         endpoint: routes.receipt,
      //         data: { store_id, api_token, checkout_id, environment, action, ticket }
      //       });

      //       myCheckout.closeCheckout([ticket]);
      //       navigate('/return', { replace: true, state: {success: receipt.success} });

      //     }
      //     );
      //   // }
      // }

      // monerisPayment();
      // with using util generateCheckoutSession ////////////////////////////////////
      const monerisPayment = async () => {
        // const checkoutResult = await generateCheckoutSession(navigate, state?.totalPrice || 0);
        console.log('state to generateCheckoutSession', state);
        if(state && state.totalPrice > 0) {
          await generateCheckoutSession(navigate, state?.totalPrice || 0);
        }
        // console.log('checkoutResult: ', checkoutResult);
        // const { isPaymentComplete, paymentReceipt } = checkoutResult;
        // console.log('isPaymentComplete: ', isPaymentComplete);
        // console.log('paymentReceipt: ', paymentReceipt);
        // if (isPaymentComplete) {
        //   console.log('qwertyqwertyqwerty');
        //   navigate('/return', { replace: true, state: {success: paymentReceipt.success} });
        // }
      }

      monerisPayment();
      // with using util generateCheckoutSession ////////////////////////////////////


      // with using hook useCheckoutSession ////////////////////////////////////
      // const { isPaymentComplete, paymentReceipt } = useCheckoutSession();

      // if (isPaymentComplete) {
      //   console.log('CheckoutPage_dfgjftrmhlyhtrjletjrly');
      //   navigate('/return', { replace: true, state: {success: paymentReceipt.success} });
      // }
      // with using hook useCheckoutSession ////////////////////////////////////
    }

  // }, [navigate, isPaymentComplete]);
  // }, [navigate]);
  // eslint-disable-next-line
  }, []);

  const handleStripeCheckout = (e) => {
    e.preventDefault();
    paymentService.create({
      endPoint: configFile.stripe.routes.checkout,
      data: {},
    });

  };


  return (
    <>
    <Header />
    <Container>
      <main className="checkoutPage__main">
      <h2 className="checkoutPage__title">Checkout page</h2>
      {
        configFile.monerisGateway ? (
          <>
            <div className="checkoutPage__payment">
              <div className="checkoutPage__info">
                <h3>This is a checkout information</h3>
              </div>

              {
                !state || state.totalPrice <= 0 ?
                <h3> Total price is 0. Please check you've booked a room</h3> :
                <div id="checkoutPage__moneris_outer">
                  <div id="monerisCheckout"></div>
                </div>
              }
            </div>
          </>
        ) : (
          <>
            {/* <form action="http://localhost:8080/api/create-checkout-session" method="POST"> */}
              {/* <button type="submit">
                Checkout
              </button> */}
              {/* <Button type="submit"> */}
              <Button onClick={handleStripeCheckout}>
                Checkout
              </Button>
            {/* </form> */}
          </>
        )
      }
      </main>
    </Container>
    <Footer />
  </>
  )
};

export default CheckoutPage;
