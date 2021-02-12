const fs = require("fs");
const path = require("path");
const { JSONPath } = require("jsonpath-plus");

class Config {
  //configuration
  configFileName: string = "";
  configDirPath: string = "";
  configFile: string = "";
  configFileData: string = "";
  config: any = {};

  constructor() {
    try {
      this.configFileName = "config.json";
      this.configDirPath = __dirname;
      this.configFile = path.join(this.configDirPath, this.configFileName);

      this.config = JSON.parse(fs.readFileSync(this.configFile));
      // return this.config;
    } catch (error) {
      console.log(error.message);
    }
  }
}

export { Config };
