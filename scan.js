const AxeBuilder = require('@axe-core/webdriverjs');
const WebDriver = require('selenium-webdriver');

const driver = new WebDriver.Builder().forBrowser('chrome').build();

driver.get('https://dequeuniversity.com/demo/mars/').then(() => {
  new AxeBuilder(driver).analyze((err, results) => {
    if (err) {
      console.log(err)
    }

    let inapplicable = results.inapplicable;
    let passes = results.passes;
    let incomplete = results.incomplete;
    let violations = results.violations;

    console.log(results);
  });
});
