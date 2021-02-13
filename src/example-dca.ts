/*

Dollar Cost Averaging

Every day run this script

It will cancel all orders, then place another one at the day's low

*/

import { Moonbot } from "./moonbot.js";

const options = {
  live: false,
  dryRun: true,
};

const delay = 5 * 1000; //number of minutes * 1000 = delay in milliseconds

const mb = new Moonbot(options);

function trade() {
  // submit a trade order for $50 USD of Bitcoin at the current low
  mb.buyBTCLow(50);
}

mb.cancelOrders();

//cancel before ordering or you may run out of available funds.
setTimeout(trade, delay);
