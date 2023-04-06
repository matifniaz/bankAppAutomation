/// <reference types="Cypress" />
const homepage = require("../pages/home_page");
const accountpage = require("../pages/account_page");
const customerpage = require("../pages/customer_page");
const excelFilePath = "cypress/fixtures/Testdata.xlsx";
const sheetName = "CustomerTransaction";
let transaction_data_lenght
var transaction_data

describe("Debit Credit Transactions By Customer", () => {
    beforeEach(() => {

        cy.visit('/login')

    })
    before(() => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        //Excel Code Start
        cy.task("generateJSONFromExcel", { excelFilePath, sheetName }).then(
            (tran_data) => {
                transaction_data_lenght = tran_data.length;
                transaction_data = tran_data;
            }
        )
        //Excel Code End
    })

    it("Debit Credit Transactions", () => {
        homepage.verifyHomePage();
        homepage.ClickonCustomerLogin();
        customerpage.selectUserDropDown('Hermoine Granger')
        accountpage.selectUserAccount('1003')
        accountpage.currentBalance()
        //cy.addContextWithSnapShot()
        for (let k = 0; k < transaction_data_lenght; k++) {
            cy.addContext("<<=========" +k+"."+transaction_data[k].transcation_Type+"=========>>")
            if (transaction_data[k].transcation_Type === 'Credit') {
                accountpage.deposit_Amount(transaction_data[k].amount)
               // cy.screenshot()
            }
            else if (transaction_data[k].transcation_Type === 'Debit') {
                accountpage.withdrawl_Amount(transaction_data[k].amount)
               // cy.screenshot()

            }
            else {
                cy.log(k + "<--------------->" + transaction_data[k].transcation_Type + "<--------------->")
            }
            accountpage.verifyCurrentBalance(transaction_data[k].current_Balance)
        }
        

        // var test = accountpage.current_Balance();
        // cy.log("*******************" + test)


        //    accountpage.elements.currentBalance().invoke('text').as('textFunction');
        //   // cy.log("===== Print Value Using Invoke Command ==== ", textFunction)

    })
    // it("Print Value - ALias => Invoke - Command ", function () {
    //     cy.log("===== Print Value Using Invoke Command ==== ", this.textFunction)
    // })

})