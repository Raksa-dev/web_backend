var express = require("express");
var app = express();
const dotenv = require("dotenv");
dotenv.config();

const paymentRouter = require("./routes/payment.routes");

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/api", paymentRouter);

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://localhost:8080", host, port);
});
