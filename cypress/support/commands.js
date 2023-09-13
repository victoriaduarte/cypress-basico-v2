Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Victoria')
    cy.get('#lastName').type('Duarte')
    cy.get('#email').type('victoria@example.com')
    cy.get('#open-text-area').type('test')
    cy.get('button[type="submit"]').click()
})
