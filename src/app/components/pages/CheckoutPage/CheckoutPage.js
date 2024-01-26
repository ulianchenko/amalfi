import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Container } from '@mui/material';
import Button from '../../common/Button';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import configFile from '../../../config.json';

// For checkout with Moneris payment set moneris to true
const moneris = true;

const getPaymentTicket = async () => {
  let preloadRequest = {
    store_id: "moneris",
    api_token: "hurgle",
    checkout_id: "chkt5BF66neris",
    txn_total: "452.00",
    environment: "qa",
    action: "preload",
    order_no: "",
    cust_id: "chkt - cust - 0303",
    dynamic_descriptor: "dyndesc",
    language: "en",
    cart: {
      items: [
        {
          url: "https://example.com/examples/item1.jpg",
          description: "One item",
          product_code: "one_item",
          unit_cost: "100.00",
          quantity: "1",
        },
        {
          url: "https://example.com/examples/item2.jpg",
          description: "Two item",
          product_code: "two_item",
          unit_cost: "200.00",
          quantity: "1",
        },
        {
          url: "https://example.com/examples/item3.jpg",
          description: "Three item",
          product_code: "three_item",
          unit_cost: "100.00",
          quantity: "1",
        },
      ],
      subtotal: "400.00",
      tax: {
        amount: "52.00",
        description: "Taxes",
        rate: "13.00",
      },
    },
    contact_details: {
      first_name: "bill",
      last_name: "smith",
      email: "test@moneris.com",
      phone: "4165551234",
    },
    shipping_details: {
      address_1: "1 main st",
      address_2: "Unit 2012",
      city: "Toronto",
      province: "ON",
      country: "CA",
      postal_code: "M1M1M1",
    },
    billing_details: {
      address_1: "1 main st",
      address_2: "Unit 2000",
      city: "Toronto",
      province: "ON",
      country: "CA",
      postal_code: "M1M1M1",
    },
  };

  const response = await fetch(`${configFile.apiEndPoint}/moneris-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(preloadRequest),
  });

  const result = await response.json();
  return result;
};

const getPaymentReceipt = async (ticket) => {
  const receiptRequest = {
    store_id: "moneris",
    api_token: "hurgle",
    checkout_id: "chkt5BF66neris",
    ticket: ticket,
    environment: "qa",
    action: "receipt",
  };

  const response = await fetch(`${configFile.apiEndPoint}/moneris-receipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(receiptRequest),
  });

  const result = await response.json();
  return result;
};

const CheckoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {

    window.onload = function () {
      console.log("start");
      window.onbeforeunload = function (e) {
        e = e || window.event;
        var msg = {};
        msg["handler"] = "page_closed";
        msg["response_code"] = "001";
        window.parent.postMessage(JSON.stringify(msg), "*");
      };
    };

    const moneris = window.monerisCheckout;

    async function monerisPayment() {
      if (moneris) {
        var myCheckout = new moneris();

        myCheckout.setMode("qa");
        myCheckout.setCheckoutDiv("monerisCheckout");

        myCheckout.setCallback("page_loaded", (res) => {
          // console.log("page_loaded: ", res)
        }
        );
        myCheckout.setCallback("cancel_transaction", (res) =>
          console.log("cancel_transaction: ", res)
        );
        myCheckout.setCallback("error_event", (res) =>
          console.log("error_event: ", res)
        );
        myCheckout.setCallback("payment_receipt", (res) => {
          // console.log("payment_receipt: ", res)
        }
        );

        const ticket = await getPaymentTicket();

        myCheckout.startCheckout([ticket]);

        myCheckout.setCallback("payment_complete", async (res) => {
          const receipt = await getPaymentReceipt(ticket);

          myCheckout.closeCheckout([ticket]);
          navigate('/return', { replace: true, state: {success: receipt.success} });

        }
        );
      }
    }

    monerisPayment();

  }, [navigate]);


  return (
    <>
    <Header />
    <Container>
      <main className="checkoutPage__main">
      <h2 className="checkoutPage__title">Checkout page</h2>
      {
        moneris ? (
          <>
            <div id="checkoutPage__moneris_outer">
              <div id="monerisCheckout"></div>
            </div>
          </>
        ) : (
          <>
            <form action="https://amalfi-api.onrender.com/create-checkout-session" method="POST">
              {/* <button type="submit">
                Checkout
              </button> */}
              <Button>
                Checkout
              </Button>
            </form>
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
