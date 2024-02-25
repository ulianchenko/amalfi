import paymentService from '../services/payment.service';
import configFile from '../config.json';
import monerisPreloadRequest from '../mockData/monerisPreloadRequest.json';

const generateCheckoutSession = async (navigate) => {
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

    let isPaymentComplete = false;
    let paymentReceipt = {};

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
      const ticket = await paymentService.create({
        endPoint: routes.ticket,
        data: monerisPreloadRequest,
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

        isPaymentComplete = true;
        paymentReceipt = receipt.content;
        console.log('receipt: ', receipt.content);
        navigate("/return", { replace: true, state: { success: receipt.content.success } });
      });
      // }
      return { isPaymentComplete, paymentReceipt };
  } catch (error) {
    console.log('generate checkout session error: ', error);
  }
}

export default generateCheckoutSession;