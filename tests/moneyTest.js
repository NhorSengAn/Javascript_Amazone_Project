import { formatCurrency } from "../scripts/untils/money.js";

if (formatCurrency(1090) === "10.90") {
  console.log("Passed");
} else {
  console.log("Failed");
}

if(formatCurrency(2000.5) === '20.01') {
  console.log('passed')
}