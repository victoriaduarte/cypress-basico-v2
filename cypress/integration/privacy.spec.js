it('test the privacy policy page independently', function () {
    cy.visit('./src/privacy.html')
    cy.contains('h1#title', 'CAC TAT - Política de privacidade').should('be.visible',)
})