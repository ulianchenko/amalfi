import paymentService from '../services/payment.service';
import configFile from '../config.json';
import monerisPreloadRequest from '../mockData/monerisPreloadRequest.json';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckoutSession = async (totalPrice) => {
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [paymentReceipt, setPaymentReceipt] = useState({});
  const navigate = useNavigate();
  console.log('monerisPreloadRequest: ', monerisPreloadRequest);
  // const preloadRequestData = JSON.parse(monerisPreloadRequest);
  // monerisPreloadRequest.txn_total = totalPrice;
  monerisPreloadRequest.txn_total = totalPrice.toFixed(2).toString();
  monerisPreloadRequest.cart.subtotal = (totalPrice / (100 + parseFloat(monerisPreloadRequest.cart.tax.rate)) * 100).toFixed(2).toString();
  monerisPreloadRequest.cart.tax.amount = (totalPrice - monerisPreloadRequest.cart.subtotal).toFixed(2).toString();
  try {
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

    // let isPaymentComplete = false;
    // let paymentReceipt = {};

    const moneris = window.monerisCheckout;

    const { store_id, api_token, checkout_id, environment, action, routes } =
      configFile.moneris;

    // async function monerisPayment() {
      var myCheckout = new moneris();

      myCheckout.setMode("qa");
      myCheckout.setCheckoutDiv("monerisCheckout");

      myCheckout.setCallback("page_loaded", (res) => {
        // console.log("page_loaded: ", res)
      });
      myCheckout.setCallback("cancel_transaction", (res) =>
        console.log("cancel_transaction: ", res)
      );
      myCheckout.setCallback("error_event", (res) =>
        console.log("error_event: ", res)
      );
      myCheckout.setCallback("payment_receipt", (res) => {
        // console.log("payment_receipt: ", res)
      });

      // const ticket = await getPaymentTicket();
      console.log(monerisPreloadRequest);
      const ticket = await paymentService.create({
        endPoint: routes.ticket,
        data: monerisPreloadRequest,
        // data: JSON.stringify(monerisPreloadRequest),
        // data: JSON.stringify(preloadRequestData),
      });
      console.log('ticket: ', ticket.content);

      myCheckout.startCheckout([ticket.content]);
      console.log('checkout started');

      myCheckout.setCallback("payment_complete", async (res) => {
        // const receipt = await getPaymentReceipt(ticket);
        const receipt = await paymentService.create({
          endPoint: routes.receipt,
          data: { store_id, api_token, checkout_id, environment, action, ticket: ticket.content },
        });

        myCheckout.closeCheckout([ticket.content]);

        // isPaymentComplete = true;
        // paymentReceipt = receipt.content;
        setIsPaymentComplete(true);
        setPaymentReceipt(receipt.content);
        console.log('receipt: ', receipt.content);
        console.log('useCheckout_kljmbgkmh');
        navigate('/return', { replace: true, state: { success: receipt.content.success } });
      });
      // }
      return { isPaymentComplete, paymentReceipt };
  } catch (error) {
    console.log('generate checkout session error: ', error);
  }
}

export default useCheckoutSession;
