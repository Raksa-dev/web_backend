const nodeCCAvenue = require("node-ccavenue");
const merchant_id = "2711780";
const test_working_key = "0E529A90F8B0AD7253E2C98A9E320201";
const access_code = "AVUZ05KI20BE51ZUEB";
const ccav = new nodeCCAvenue.Configure({
  merchant_id: merchant_id,
  working_key: test_working_key,
});

class PaymentController {
  static async handlePaymentController(req, res, next) {
    try {
      const orderParams = {
        merchant_id: merchant_id,
        order_id: 8765432,
        currency: "INR",
        amount: "1",
        redirect_url: encodeURIComponent(`https://raksa.tech/api/response`),
        billing_name: "Name of the customer",
        language: "en",
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
      // console.log("this is request", req);
      // console.log("this is data :", req.body);
      // req.on("data", function (data) {
      //   ccavEncResponse += data;
      //   ccavPOST = qs.parse(ccavEncResponse);
      //   var encryption = ccavPOST.encResp;
      //   console.log("this is encryption", encryption);
      //   ccavResponse = ccav.decrypt(encryption, workingKey);
      // });
      var encryption = req.body.encResp;
      var ccavResponse = ccav.redirectResponseToJson(encryption);
      console.log("this is ccavResponse", ccavResponse);
      if (ccavResponse["order_status"] == "Success") {
        res.redirect("https://www.astroraksa.com/transaction?type=success");
      } else {
        res.redirect("https://www.astroraksa.com/transaction");
      }
      res.status(200).send(JSON.stringify(ccavResponse));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
