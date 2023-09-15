const nodeCCAvenue = require("node-ccavenue");
const merchant_id = "2711780";
const test_working_key = "FEC2CE823D99E05BCDE44C23E01732DE";
const access_code = "AVKI13KI46BF35IKFB";
const ccav = new nodeCCAvenue.Configure({
  merchant_id: merchant_id,
  working_key: test_working_key,
});

class PaymentController {
  static async handlePaymentController(req, res, next) {
    try {
      const orderParams = {
        merchant_id: merchant_id,
        redirect_url: encodeURIComponent(`https://raksa.tech/api/response`),
        billing_name: "Name of the customer",
        ...req.body,
      };
      const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
      let formbody =
        '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
        encryptedOrderData +
        `"><input type="hidden" name="access_code" id="access_code" value='${access_code}'><script language="javascript">document.redirect.submit();</script></form>`;

      console.log("thisis form bosyL", formbody);
      res.setHeader("content-type", "text/html");
      res.status(200).send(formbody);
    } catch (err) {
      next(err);
    }
  }
  static async handleResponsePaymentController(req, res, next) {
    try {
      var encryption = req.body.encResp;
      var ccavResponse = ccav.redirectResponseToJson(encryption);
      console.log("this is ccavResponse", ccavResponse);
      if (ccavResponse["order_status"] == "Success") {
        res.redirect("https://www.astroraksa.com/transaction?type=success");
      } else {
        res.redirect("https://www.astroraksa.com/transaction");
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
