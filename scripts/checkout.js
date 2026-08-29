import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/car.js";
// import "../data/backend-practies.js";
import { loadCarts } from "../data/cart.js";

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("value1"); // we can use resolve to wait after finish the next step
    });
  }),
  new Promise((resolve) => {
    loadCarts(() => {
      resolve("value2"); // we can use resolve to wait after finish the next step
    });
  }),
]).then((value) => {
  console.log(value);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*

new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1"); // we can use resolve to wait after finish the next step
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCarts(() => {
        resolve(); // we can use resolve to wait after finish the next step
      });
    });
  })
  .then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });

*/

/*
this is a callback code and above we use promise to handle this issue

loadProducts(() => {
  loadCarts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/ // if we have a lot of load multiple, the code will be nesting and really hard to read
