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

Import

    import { Moonbot } from "./moonbot.js";

    const mb = new Moonbot();

Example #1:

    mb.buyBTCLow(50); //places a limit order for $50 of BTC at the last 24 hour low

Example #2

    mb.buyBTC(50,45000); //places a limit order for $50 of BTC at $45,000

See example.ts files for more examples

## Running the example app

    npm install && tsc
    npm run demo
    #OR  node dist/example-buy.js

output:

    placing an order:
    dryRun:buy with parameters: {"price":"46284.53","size":"0.00108027","product_id":"BTC-USD"}
    options:{"live":false,"dryRun":true}

ToDO:

- Add support for options file.
- Make exceptions when cancelling for trades made
