# Moonbot

Moonbot is a simple dollar cost averaging trading bot that places a single limit order at the last 24 hour low.

It doesn't do shorts, or anything fancy. yet.

It currently supports purchasing Bitcoin on Coinbase.

Use at your own risk!

## Setup

    git clone git@github.com:ajdruff/moonbot.git
    cd moonbot
    npm install && tsc
    cp dist/config-example.json dist/config.json
    # edit config.json with your Coinbase API keys

## Options

    {
    live: false,
    dryRun: true,
    };

> - live: false - run in coinbase sandbox,otherwise live
> - dryRun:true; instead of submitting trades, outputs request values

## Usage

Defaults are 'failsafe', so will pull from Sandbox environment using Dry Run mode.

Dry Run will call any API that only reads from the API but will not perform any writes.

This is a simple library that you can use to build your own bot.

Create your Node.js file, example.tsc

Import

    import { Moonbot } from "./moonbot.js";

    const mb = new Moonbot();

Example #1:

    mb.buyBTCLow(50); //places a limit order for $50 of BTC at the last 24 hour low

Example #2

    mb.buyBTC(50,45000); //places a limit order for $50 of BTC at $45,000

See example.ts files for more examples

## Running the example app

    npm run demo
    #OR  node dist/example-buy.js

output:

    placing an order:
    dryRun:buy with parameters: {"price":"46284.53","size":"0.00108027","product_id":"BTC-USD"}
    options:{"live":false,"dryRun":true}

ToDO:

- Add support for options file.
- Make exceptions when cancelling for trades made
