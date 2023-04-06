class customer_page {
    elements = {
        heading: () => cy.xpath('//strong[contains(text(),"XYZ Bank")]'),
        home_button: (button_name) => cy.xpath('//button[contains(text(),"' + button_name + '")]'),
        button: (button_name) => cy.xpath('//div[@class="center"]//button[contains(text(),"' + button_name + '")]'),
        field: (field_name) => cy.xpath('//input[@placeholder="' + field_name + '"]'),
        addCustomer_button: () => cy.xpath('//button[@type="submit"][contains(text(),"Add Customer")]'),

        verifyCustomer: (firstName, lastName, postalCode) => cy.xpath('//tr/td[contains(text(),"' + firstName + '")]//following-sibling::td[contains(text(),"' + lastName + '")]//following-sibling::td[contains(text(),"' + postalCode + '")]'),
        deleteCustomer: (firstName, lastName, postalCode) => cy.xpath('//tr/td[contains(text(),"' + firstName + '")]//following-sibling::td[contains(text(),"' + lastName + '")]//following-sibling::td[contains(text(),"' + postalCode + '")]//following-sibling::td/button[contains(text(),"Delete")]'),
        //tr/td[contains(text(),'Jackson')]//following-sibling::td[contains(text(),'Connely')]//following-sibling::td[contains(text(),'L789C349')]//following-sibling::td/button[contains(text(),"Delete")]
        selectUser: () => cy.xpath('//select[@id="userSelect"]'),
        loginButton: () => cy.xpath('//button[@type="submit"][contains(text(),"Login")]'),

    };

    verifyCustomerPage() {
        //this.elements.heading().
        this.elements.heading().should('be.visible');

        this.elements.home_button('Home').should('be.visible');
        this.elements.button('Add Customer').should('be.visible');
        this.elements.button('Open Account').should('be.visible');
        this.elements.button('Customers').should('be.visible');

        this.elements.field('First Name').should('be.visible');
        this.elements.field('Last Name').should('be.visible');
        this.elements.field('Post Code').should('be.visible');
        this.elements.addCustomer_button().should('be.visible');

    }

    addCustomer(firstName, lastName, postalCode) {
        this.elements.field('First Name').should('be.visible').clear().type(firstName)
        this.elements.field('Last Name').should('be.visible').clear().type(lastName)
        this.elements.field('Post Code').should('be.visible').clear().type(postalCode)
        cy.addContext("Added Customer Using Following Data =>First Name : "+firstName+"=>Last Name : "+lastName+"=>Post Code "+postalCode)
        this.elements.addCustomer_button().should('be.visible').click()
        
        cy.on('window:alert', (alert) => {
            expect(alert).to.contains('Customer added successfully with customer id');
            cy.addContext("Pop Alert on Add Cutomer ***** "+alert+"*****")
        })

    }
    clickOnCustomerTab(){
        this.elements.button('Customers').should('be.visible').click();
        cy.addContext("Clicked on Customers Tab")
    }
    verifyAddedCustomer(firstName, lastName, postalCode) {
       
        this.elements.verifyCustomer(firstName, lastName, postalCode).should('be.visible');
        cy.addContext("Verify Added Customer Form Cusomters that have following details =>First Name : "+firstName+"=>Last Name : "+lastName+"=>Post Code "+postalCode)


    }

    delCustomer(firstName, lastName, postalCode) {
        this.elements.deleteCustomer(firstName, lastName, postalCode).should('be.visible').click();
        cy.addContext("Customer Deleted Form Cusomters that have following details =>First Name : "+firstName+"=>Last Name : "+lastName+"=>Post Code "+postalCode)
        
    }

    selectUserDropDown(user) {
        this.elements.selectUser().should('be.visible')
        this.elements.selectUser().select(user)
        cy.addContext("Select 'Name' from dropdown : " + user)
        this.elements.loginButton().should('be.visible').click()
        cy.addContext("Click On Login Button ")
    }

}

module.exports = new customer_page()