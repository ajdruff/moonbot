# Moonbot

Moonbot is a simple dollar cost averaging trading bot.

It currently supports purchasing Bitcoin on Coinbase.

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

See app.ts for latest examples

    import { Moonbot } from "./moonbot.js";

    const mb = new Moonbot();

    mb.placeOrder(50);

## Running the example app

    npm install
    tsc;node dist/app.js

output:

    dryRun:buy with parameters: {"price":"46750","size":"0.00106952","product_id":"BTC-USD"}
