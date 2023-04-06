class manager_page {
    elements = {
        heading: () => cy.xpath('//strong[contains(text(),"XYZ Bank")]'),
        //Group Permission locators
        button: (button_name) => cy.xpath('//button[contains(text(),"'+button_name+'")]'),
    };  

    verifyMangerPage(){
    //this.elements.heading().
    this.elements.heading().should('be.visible');
    this.elements.button('Home').should('be.visible');
    this.elements.button('Add Customer').should('be.visible');
    this.elements.button('Open Account').should('be.visible');
    this.elements.button('Customers').should('be.visible');
    }

    clickOnAddCusotmer(){
        this.elements.button('Add Customer').should('be.visible').click();
        cy.addContext("Clicked on Add Customer Button")
    }
}

module.exports = new manager_page()