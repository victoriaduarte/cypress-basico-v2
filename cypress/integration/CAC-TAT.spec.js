/// <reference types="Cypress" />   /* Cypress autocomplete */

describe('Central de Atendimento ao Cliente TAT', function() {  /* Test suite */

    this.beforeEach(function() {
        cy.visit('./src/index.html')  /* Relative path based on cypress.json */
    })

    it('verify the page title', function() {  /* Test case */
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('fill out the required fields and send the form', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.get('#firstName').type('Victoria')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('victoria@example.com')
        cy.get('#open-text-area').type(longText, {delay: 0})  /* enter the text immediately (no delay in typing) */
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
        })
  })
  