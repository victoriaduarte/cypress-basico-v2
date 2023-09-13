/// <reference types="Cypress" />   /* Cypress autocomplete */

describe('Central de Atendimento ao Cliente TAT', function() {  /* Test suite */

    this.beforeEach(function() {
        cy.visit('./src/index.html')  /* Relative path based on cypress.json */
    })

    it('verify the page title', function() {  /* Test case */
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it.only('fill out the required fields and send the form', function() {
        cy.get('#firstName').type('Victoria')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('victoria@example.com')
        cy.get('#open-text-area').type('test')
        cy.get('button[type="submit"]').click()
        
        cy.get('.success').should('be.visible')
        })
  })
  