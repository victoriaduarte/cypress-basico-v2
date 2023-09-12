/// <reference types="Cypress" />   /* Cypress autocomplete */

describe('Central de Atendimento ao Cliente TAT', function() {  /* Test suite */

    it('verifica o título da aplicação', function() {  /* Test case */
        cy.visit('./src/index.html')  /* Relative path based on cypress.json */
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
  })
  