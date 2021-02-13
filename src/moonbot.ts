import configs from "./config.json";
import options_file from "./options.json";
const CoinbasePro = require("coinbase-pro");
const { JSONPath } = require("jsonpath-plus");
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
  config: any;

  private options: IXOptions;

  constructor(XOptions?: IXOptions) {
    this.options = { ...XOptionsDefaults, ...XOptions };
    if (this.options.live) {
      this.config = configs.live;
    } else {
      this.config = configs.sandbox;
    }
    this.cbClient = new CoinbasePro.AuthenticatedClient(
      this.config.key,
      this.config.secret,
      this.config.passphrase,
      this.getBaseURL()
    );
  }

  private placeOrderCallback(err: any, data: any) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Placed order successfully");
      console.log(data.body);
    }
  }

  async buyBTCLow(orderCost: number) {
    var that = this;
    const stats = await this.getStats();

    const buyParams = {
      price: stats.low, // USD
      size: this.round(orderCost / stats.low, 8), // BTC
      product_id: "BTC-USD",
    };

    const usdAccount = await that.getUSDAccount();
    // console.log("funds available: " + usdAccount.available);
    const fundsAvailable = usdAccount.available;
    if (orderCost > fundsAvailable) {
      console.log("insufficient funds, refusing to proceed with order");
      console.log(usdAccount.available);
      return;
    }

    if (this.options.dryRun) {
      console.log("dryRun:buy with parameters: " + JSON.stringify(buyParams));
      console.log("options:" + JSON.stringify(this.options));
    } else {
      this.cbClient.buy(buyParams, this.placeOrderCallback);
    }
  }

  async buyBTC(orderCost: number, BTCPrice: number) {
    const stats = await this.getStats();

    const buyParams = {
      price: BTCPrice, // USD
      size: this.round(orderCost / BTCPrice, 8), // BTC
      product_id: "BTC-USD",
    };
    if (this.options.dryRun) {
      console.log("dryRun:buy with parameters: " + JSON.stringify(buyParams));
      console.log("options:" + JSON.stringify(this.options));
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

  private getOrdersCallback(err: any, data: any) {
    if (err) {
      console.error(err.message);
    } else {
      //console.log("Placed order successfully");

      let bodyJsonString = JSONPath({ path: "$.body", json: data });
      //
      // console.log(jsonString[0]);
      // root $
      //id $..id
      let orders = JSONPath({ path: "$", json: JSON.parse(bodyJsonString) });

      return orders;
    }
  }

  async cancelOrders() {
    try {
      var that = this;
      const orders = await this.getOrders().then(function (orders) {
        //console.log(orders);
        let orderIds = JSONPath({ path: "$..id", json: orders });
        Object.keys(orderIds).forEach(function (key) {
          let orderID = orderIds[key];
          console.log("cancelling order: " + orderID);

          if (that.options.dryRun) {
            console.log("dryRun: " + "cancelled order " + orderID);
          } else {
            that.cbClient.cancelOrder(orderID);
          }
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async getOrders() {
    try {
      const data = await this.cbClient.getOrders({
        product_id: "BTC-USD",
        status: "open",
      });

      return data;
    } catch (error) {
      console.log(error.message);
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
    return this.config.secret;
  }
  getKey() {
    return this.config.key;
  }

  async getUSDAccount() {
    try {
      var that = this;

      const result = await this.getAccounts().then(function (data) {
        let accountUSD = JSONPath({
          //   path: "..id[?(@.type=='ach_bank_account')]",
          //path: "$..id[?(@.currency=='USD')]",
          path: "$.[?(@.currency=='USD')]",
          json: data,
        });
        // console.log(accountUSD);
        //let accountIdUSD = JSONPath({ path: "$..id", json: accountUSD });
        return accountUSD[0];
      });
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
  async getAccounts() {
    try {
      const data = await this.cbClient.getAccounts();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export { Moonbot };
