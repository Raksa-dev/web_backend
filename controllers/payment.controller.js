const nodeCCAvenue = require("node-ccavenue");
const ccav = new nodeCCAvenue.Configure({
  merchant_id: process.env.merchant_id,
  working_key: process.env.test_working_key,
});

class PaymentController {
  static async handlePaymentController(req, res, next) {
    try {
      console.log(process.env.merchant_id);
      console.log(process.env.test_working_key);
      console.log(process.env.access_code);
      const orderParams = {
        merchant_id: process.env.merchant_id,
        order_id: 8765432,
        currency: "INR",
        amount: "100",
        redirect_url: encodeURIComponent(
          `http://localhost:3000/api/redirect_url/`
        ),
        billing_name: "Name of the customer",
      };
      const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
      let formbody =
        '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
        encryptedOrderData +
        `"><input type="hidden" name="access_code" id="access_code" value='${process.env.access_code}'><script language="javascript">document.redirect.submit();</script></form>`;

      console.log("thisis form bosyL", formbody);
      res.setHeader("content-type", "text/html");
      res.status(200).send(formbody);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PaymentController;
