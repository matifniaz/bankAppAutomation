class account_page {
    elements = {
        selectAccount: () => cy.xpath("//select[@id='accountSelect']"),
        currentBalance: () => cy.xpath("//div[@ng-hide='noAccount']/strong[2]"),

        button: (button_name) => cy.xpath('//div[@class="center"]//button[contains(text(),"' + button_name + '")]'),

        amount: () => cy.xpath('//input[@placeholder="amount"]'),

        deposit_page: () => cy.xpath('//label[normalize-space()="Amount to be Deposited :"]'),
        depositButton: () => cy.xpath('//button[@type="submit"][contains(text(),"Deposit")]'),

        withdrawal_page: () => cy.xpath('//label[normalize-space()="Amount to be Withdrawn :"]'),
        withdrawlButton: () => cy.xpath('//button[@type="submit"][contains(text(),"Withdraw")]'),
    }
    currentBalance() {
        this.elements.currentBalance().then(($bal) => {
            const curBalance = $bal.text();
            cy.addContext("<-----------Current Balance of Account " + curBalance+"----------->")
        })
    }
    selectUserAccount(accountNo) {
        this.elements.selectAccount().should('be.visible')
        this.elements.selectAccount().select(accountNo)
        cy.addContext("Select 'Account' from dropdown : " + accountNo)
    }

    verifyCurrentBalance(current_Balance) {
        this.elements.currentBalance().should('be.visible')
        this.elements.currentBalance().as("currentBalance")
        cy.get("@currentBalance").should("contain", current_Balance)
        cy.addContext("<<********************Current Balance of Account " + current_Balance+"********************>>")
        // this.elements.currentBalance().invoke('val').should('eq',current_Balance)
    }
    deposit_Amount(amount) {
        this.elements.button('Deposit').should('be.visible').click()
        this.elements.deposit_page().should('be.visible')
        cy.addContext("Click on Deposit Tab")
        this.elements.amount().should('be.visible').clear().type(amount)
        cy.addContext("<-----------Deposit Amount :" + amount+"----------->")
        this.elements.depositButton().should('be.visible').click()
        cy.addContext("Click on Deposit Button")
    }

    withdrawl_Amount(amount) {
        this.elements.button('Withdrawl').should('be.visible').click()
        cy.addContext("Click on Withdrawl Tab")
        this.elements.withdrawal_page().should('be.visible')
        this.elements.amount().should('be.visible').clear().click().type(amount)
        cy.addContext("<-----------Withdrawl Amount :" + amount+"----------->")
        this.elements.withdrawlButton().should('be.visible').click()
        cy.addContext("Click on Withdrawl Button")
    }
}
module.exports = new account_page()