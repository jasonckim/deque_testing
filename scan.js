const AxeBuilder = require('@axe-core/webdriverjs');
const WebDriver = require('selenium-webdriver');
const assert = require("chai").assert;

const driver = new WebDriver.Builder().forBrowser('chrome').build();

driver.get('https://dequeuniversity.com/demo/mars/').then(() => {
  new AxeBuilder(driver).analyze().then(results => {
    if (results.violations.length == 0) {
      assert.equal(0, true, "no violations found")
    }
    else {
      console.log(results.violations.length)
      console.log(results.violations)
    }
  })
});
