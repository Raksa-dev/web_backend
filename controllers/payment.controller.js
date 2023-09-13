const nodeCCAvenue = require("node-ccavenue");
const merchant_id = "2711780";
const test_working_key = "1A8E135945965171B67F73A71D15B5A1";
const access_code = "AVFT05KI19BA28TFAB";
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
        amount: "1",
        // redirect_url: encodeURIComponent(
        //   `http://65.0.182.222:3000/api/response`
        // ),
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
  static async handleResponsePaymentController(req, res, next) {
    try {
      console.log("this is request", req);
      console.log("this is data :", req.body);
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
      res.status(200).send(JSON.stringify(ccavResponse));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
