import config from "./config.json";
const CoinbasePro = require("coinbase-pro");

//[Typescript interface defaults](https://stackoverflow.com/a/54474807/3306354)
interface IXOptions {
  live?: boolean;
  dryRun?: boolean;
}

const XOptionsDefaults: IXOptions = {
  live: false,
  dryRun: true,
};

class Moonbot {
  cbClient: any = {};
  orderBudget: number = 0;

  private options: IXOptions;

  constructor(XOptions?: IXOptions) {
    this.options = { ...XOptionsDefaults, ...XOptions };

    this.cbClient = new CoinbasePro.AuthenticatedClient(
      config.key,
      config.secret,
      config.passphrase,
      this.getBaseURL()
    );
  }

  private placeOrderCallback(err: any, data: any) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(data);
    }
  }

  async placeOrder(orderBudget: number) {
    const stats = await this.getStats();
    console.log(stats.low);
    const buyParams = {
      price: stats.low, // USD
      size: this.round(orderBudget / stats.low, 8), // BTC
      product_id: "BTC-USD",
    };
    console.log(buyParams);
    if (this.options.dryRun) {
      console.log("dryRun:buy with parameters: " + JSON.stringify(buyParams));
    } else {
      this.cbClient.buy(buyParams, this.placeOrderCallback);
    }
  }

  private round(value: number, decimals: number) {
    return value.toFixed(decimals);
  }

  getBaseURL() {
    const sandboxURI = "https://api-public.sandbox.pro.coinbase.com";
    const liveApiURI = "https://api.pro.coinbase.com";

    if (this.options.live) {
      return liveApiURI;
    } else {
      return sandboxURI;
    }
  }

  async getStats() {
    try {
      const data = await this.cbClient.getProduct24HrStats("BTC-USD");
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  getSecret() {
    return config.secret;
  }
  getKey() {
    return config.key;
  }
}

export { Moonbot };
