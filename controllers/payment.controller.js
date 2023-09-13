const nodeCCAvenue = require("node-ccavenue");
const merchant_id = "2711780";
const test_working_key = "DAB87D0ACECB98A9B08795730D603F05";
const access_code = "AVAP10KI23AJ87PAJA";
const ccav = new nodeCCAvenue.Configure({
  merchant_id: merchant_id,
  working_key: test_working_key,
});

class PaymentController {
  static async handlePaymentController(req, res, next) {
    try {
      console.log(merchant_id);
      console.log(test_working_key);
      console.log(access_code);
      const orderParams = {
        merchant_id: merchant_id,
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
        `"><input type="hidden" name="access_code" id="access_code" value='${access_code}'><script language="javascript">document.redirect.submit();</script></form>`;

      console.log("thisis form bosyL", formbody);
      res.setHeader("content-type", "text/html");
      res.status(200).send(formbody);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PaymentController;
