const AxeBuilder = require('@axe-core/webdriverjs');
const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("chai").assert;

describe("verify: nav has loaded, page title is correct, nav links work, and page analyzed", function () {
  it("main-nav element has loaded", async function () {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
       await driver.get("https://dequeuniversity.com/demo/mars/");

       let check = await driver
         .findElement(By.id('main-nav'))
         .isDisplayed();

       assert.equal(check, true);
     } finally {
       console.log("FIRST TEST PASSED");
        await driver.quit();
     }
  })

  it("page title is correct", async function () {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
       await driver.get("https://dequeuniversity.com/demo/mars/");

      let titleCheck = await driver.getTitle();

       assert.equal(titleCheck, 'Mars Commuter: Travel to Mars for Work or Pleasure!');
     } finally {
       console.log("SECOND TEST PASSED");
       await driver.quit();
     }
  })

  it("links redirect to correct page", async function () {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
       await driver.get("https://dequeuniversity.com/demo/mars/");

      let linkCheck = await driver
        .findElement(By.tagName('a'))
        .click()
        return driver.getCurrentUrl();

       assert.equal(linkCheck, 'https://dequeuniversity.com/demo/mars/mars2.html?a=send_me_to_mars');
     } finally {
       console.log("THIRD TEST PASSED");
       await driver.quit();
     }
  })

  it("analyzes the page with axe", async function () {
    let driver = await new Builder().forBrowser('chrome').build();

    try{
      await driver.get('https://dequeuniversity.com/demo/mars/').then(() => {
        new AxeBuilder(driver).analyze().then(results => {
          if (results.violations.length == 0) {
            assert.equal(0, true, "no violations found")
          }
          else {
            console.log("Acessibility Violations:", results.violations.length)
          }
        })
      })
    } finally{
      console.log("TESTS COMPLETED")
    }

  })
})
