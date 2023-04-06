const { defineConfig } = require("cypress");
const xlsx = require("xlsx");
module.exports = defineConfig({
  chromeWebSecurity:false,
  viewportWidth: 1280,
  viewportHeight: 720,
  reporter: 'cypress-mochawesome-reporter',
  video: false,//Used for Enable disbale video recording
  reporterOptions: {
    charts: true, //Display Suite charts
    reportPageTitle: 'Automation Report',//Report title
    embeddedScreenshots: true, //snapshots in HTML report embedded.
    inlineAssets: true,
    saveAllAttempts: false, //ave screenshots of all test attempts, set to false to save only the last attempt
    code:false, //Display test code
    showHooks:true, //show Hook on report
    autoOpen:true, //Automatically open the report
    overwrite:true //Overwrite existing report files. 
  },
  e2e: {
    testIsolation:false, // Form Cypress 12.
    experimentalOriginDependencies:true,
    experimentalRunAllSpecs: true,
    baseUrl: 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#',
    //Use for not execute after code change.
    watchForFileChanges: false,
    //Use for Change default time out "4000".
    defaultCommandTimeout: 25000,
    requestTimeout:25000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
      on("task", {
        generateJSONFromExcel: generateJSONFromExcel,      
      });
    },
  },
});

function generateJSONFromExcel(args) {
  const wb = xlsx.readFile(args.excelFilePath, { dateNF: "mm/dd/yyyy" });
  const ws = wb.Sheets[args.sheetName];
  return xlsx.utils.sheet_to_json(ws, { raw: false });

}