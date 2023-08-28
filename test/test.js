const { Builder, By, wait, Options, until } = require("selenium-webdriver");
const chrom = require("selenium-webdriver/chrome");
const { describe } = require("mocha");
const processMetrics = require('../utils/processMetrics');
const should = require("chai").should();

describe("testing perfomence", async () => {
    let driver;
    const indicators = [
        { FirstMeaningfulPaint: 2.5 },
        { DomContentLoaded: 1 },
        { NavigationStart: 1 },
        { ResourceFetchers: 20},
    ];

    beforeEach(async () => {
        const options = new chrom.Options();
        options.addArguments("--incognito");
        options.addArguments("--start-maximized");
        options.setLoggingPrefs({ browser: "ALL" });
        driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    });


    afterEach(async () => {
        await driver.quit();
    });
  

    it("Checking the following metricі: FirstMeaningfulPaint,DomContentLoaded,NavigationStart,ResourceFetchers ", 
        async () => {
    
        await driver.get("https://dogsnavigator.com.ua");
        await driver.sendAndGetDevToolsCommand("Performance.enable");

        let obtainedMetrics = await driver.sendAndGetDevToolsCommand(
      "Performance.getMetrics"
      );
       
        const {value, answer} = await processMetrics(indicators, obtainedMetrics);
        console.log(answer);
        
        value.should.equal(true);
    });
});
