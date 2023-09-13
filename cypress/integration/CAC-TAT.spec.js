/// <reference types="Cypress" />   /* Cypress autocomplete */

describe('Central de Atendimento ao Cliente TAT', function () {  /* Test suite */

    this.beforeEach(function () {
        cy.visit('./src/index.html')  /* Relative path based on cypress.json */
    })

    it('verify the page title', function () {  /* Test case */
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('fill out the required fields and send the form', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.get('#firstName').type('Victoria')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('victoria@example.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })  /* enter the text immediately (no delay in typing) */
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('display an error message when submitting the form with an email with invalid format', function () {
        cy.get('#firstName').type('Victoria')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('victoria.example.com')
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('phone field remains empty when filled with a non-numeric value', function () {
        cy.get('#phone').type('test').should('have.value', '')
    })

    it('displays an error message when the telephone number becomes required but is not filled in before submitting the form', function () {
        cy.get('#firstName').type('Victoria')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('victoria@example.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it.only('fill out and clear the name, surname, email and telephone fields', function () {
        cy.get('#firstName')
            .type('Victoria')
            .should('have.value', 'Victoria')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Duarte')
            .should('have.value', 'Duarte')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('victoria@example.com')
            .should('have.value', 'victoria@example.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('48999999999')
            .should('have.value', '48999999999')
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('test')
            .should('have.value', 'test')
            .clear()
            .should('have.value', '')
    })
})
