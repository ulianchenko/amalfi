import { useState, useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51OWkH4GKmalhlFM42uJqMFPhnjlITHw2L79iaJJs75CWxutUnzNRWaCi6vQtPowepJRe53HHJTABEiNpn1deuzlz008AEsW3wt');

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState('');

  // useEffect(() => {
  //   // Create a Checkout Session as soon as the page loads
  //   fetch('http://localhost:8080/create-checkout-session', {
  //     method: 'POST',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);
  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    fetch('https://amalfi-server.onrender.com/create-checkout-session', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id='checkout'>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

export default CheckoutForm;