import { Moonbot } from "./moonbot.js";

const mb = new Moonbot();

// submit a trade order for $50 USD of Bitcoin at the current low
mb.placeOrder(50);
