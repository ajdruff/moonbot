import { Moonbot } from "./moonbot.js";

const options = {
  live: true,
  dryRun: false,
};

const mb = new Moonbot(options);

// submit a trade order for $50 USD of Bitcoin at the current low
//mb.placeOrder(50);

if (true) {
  mb.cancelOrders();
  console.log("placing an order:");
  mb.placeOrder(50);
}
