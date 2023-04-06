class home_page {
    elements = {
        heading: () => cy.xpath('//strong[contains(text(),"XYZ Bank")]'),
        home_button: () => cy.xpath('//button[contains(text(),"Home")]'),
        customerLogin_button: () => cy.xpath('//button[contains(text(),"Customer Login")]'),
        bankMangerLogin_button: () => cy.xpath('//button[contains(text(),"Bank Manager Login")]'),
       
    };  

    verifyHomePage(){
    //this.elements.heading().
    this.elements.heading().should('be.visible');
    this.elements.home_button().should('be.visible');
    this.elements.customerLogin_button().should('be.visible');
    this.elements.bankMangerLogin_button().should('be.visible');
    cy.addContext("User is on Home Page")
    }
    ClickonMangerLogin(){
        this.elements.bankMangerLogin_button().should('be.visible').click();
        cy.addContext("Clicked on Manger Login Button")
    }
    ClickonCustomerLogin(){
        this.elements.customerLogin_button().should('be.visible').click();
        cy.addContext("Clicked on Customer Login Button")
    }
}

module.exports = new home_page()