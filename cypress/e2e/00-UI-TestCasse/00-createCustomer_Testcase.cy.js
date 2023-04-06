/// <reference types="Cypress" />
const homepage = require("../pages/home_page");
const mangerpage = require("../pages/manger_page");
const customerpage = require("../pages/customer_page");
const excelFilePath = "cypress/fixtures/Testdata.xlsx";
const sheetName = "CustomerData";
let customer_data_lenght
var customer_data
describe("create customers - Verify Customer - Delete Cutomer", () => {
    beforeEach(() => {
        
        cy.visit('/login')
        
    })
    before(()=>{
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        //Excel Code Start
    cy.task("generateJSONFromExcel", { excelFilePath, sheetName }).then(
        (cus_data) => {
            customer_data_lenght = cus_data.length;
            customer_data = cus_data;
        }
    )
    //Excel Code End
    })

    it("Create New Customers", () => {
        cy.log("User is on Login Page")
        homepage.verifyHomePage();
        homepage.ClickonMangerLogin();
        mangerpage.verifyMangerPage();
        mangerpage.clickOnAddCusotmer();
        customerpage.verifyCustomerPage();
       
        for (let k = 0; k < customer_data_lenght; k++) {
            if (customer_data[k].record_type === 'Add') {
                cy.addContext("<<=========" +k+"."+customer_data[k].record_type+" Customer=========>>")
                customerpage.addCustomer(customer_data[k].first_Name,customer_data[k].last_Name,customer_data[k].post_Code);
            }
            else {
                cy.log(k + "<--------------->"+customer_data[k].record_type+"<--------------->" + customer_data[k].first_Name)
            }
        }
        //customerpage.verifyAddedCustomer("Jackson1","Frank","L789C349");
        //customerpage.delCustomer("Jackson1","Frank","L789C349");
    })

    it("Verify Added Customers",()=>{
        homepage.verifyHomePage();
        homepage.ClickonMangerLogin();
        mangerpage.verifyMangerPage();
        customerpage.clickOnCustomerTab();
        for (let k = 0; k < customer_data_lenght; k++) {
            if (customer_data[k].record_type === 'Add') {
                cy.addContext("<<=========" +k+".Verify "+customer_data[k].record_type+" Customers=========>>")
                customerpage.verifyAddedCustomer(customer_data[k].first_Name,customer_data[k].last_Name,customer_data[k].post_Code);
            }
            else {
                cy.log(k + "<--------------->"+customer_data[k].record_type+"<--------------->" + customer_data[k].first_Name)
            }
        }
    })
    it("Delete Customers",()=>{
        homepage.verifyHomePage();
        homepage.ClickonMangerLogin();
        mangerpage.verifyMangerPage();
        customerpage.clickOnCustomerTab();

        for (let k = 0; k < customer_data_lenght; k++) {
            if (customer_data[k].record_type === 'Delete') {
                cy.addContext("<<=========" +k+"."+customer_data[k].record_type+" Customer=========>>")
                customerpage.delCustomer(customer_data[k].first_Name,customer_data[k].last_Name,customer_data[k].post_Code);
            }
            else {
                cy.log(k + "<--------------->"+customer_data[k].record_type+"<--------------->" + customer_data[k].first_Name)
            }
        }
    })
})