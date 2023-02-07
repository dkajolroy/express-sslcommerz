const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const SSLCommerzPayment = require("sslcommerz-lts");

//config
app.use(express.json());
app.use(cors());
dotenv.config();

const port = 5000;

app.use("/payment", (req, res) => {
  const data = {
    total_amount: 100,
    currency: "EUR",
    tran_id: "REF123",
    success_url: `${port}/success`,
    fail_url: `${port}/fail`,
    cancel_url: `${port}/cancel`,
    ipn_url: `${port}/ipn`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "cust@yahoo.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
  };

  const sslcz = new SSLCommerzPayment("StoreName", "Password", false);
  sslcz.init(data).then((apiResponse) => {
    if (apiResponse.status == "FAILED") {
      res.redirect("/fail");
    } else if (apiResponse.status == "CANCELLED") {
      res.redirect("/cancel");
    }
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
  });
});

app.get("/success", (req, res) => {
  res.send({ message: "success" });
});
app.get("/fail", (req, res) => {
  res.send({ message: "Error" });
});
app.get("/cancel", (req, res) => {
  res.send({ message: "cancel" });
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
