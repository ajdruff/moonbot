# Moonbot

Moonbot is a simple dollar cost averaging trading bot that places a single limit order at the last 24 hour low.

It doesn't do shorts, or anything fancy. yet.

It currently supports purchasing Bitcoin on Coinbase.

Use at your own risk!

## Setup

    cp config-sample.json config.json

## Options

    {
    live: false,
    dryRun: true,
    };

## Usage

Defaults are 'failsafe', so will pull from Sandbox environment using Dry Run mode.

Dry Run will call any API that only reads from the API but will not perform any writes.

    import { Moonbot } from "./moonbot.js";

    const mb = new Moonbot();

    mb.placeOrder(50);

See example-trade.ts for an example.

## Running the example app

    npm install
    tsc;node dist/trade-example.ts

output:

    dryRun:buy with parameters: {"price":"46750","size":"0.00106952","product_id":"BTC-USD"}


ToDO:

* Add support for options file.
* Check to see if there is any money left to buy!
* Make exceptions when cancelling for trades made 
