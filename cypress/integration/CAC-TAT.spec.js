/// <reference types="Cypress" />   /* Cypress autocomplete */

describe('Central de Atendimento ao Cliente TAT', function () {  /* Test suite */
    const THREE_SECONDS_IN_MS = 3000

    this.beforeEach(function () {
        cy.visit('./src/index.html')  /* Relative path based on cypress.json */
    })

    it('verify the page title', function () {  /* Test case */
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('fill out the required fields and send the form', function () {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'

        cy.clock()

        cy.get('#firstName').type('Victoria')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('victoria@example.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })  /* enter the text immediately (no delay in typing) */
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('display an error message when submitting the form with an email with invalid format', function () {
        cy.clock()

        cy.get('#firstName').type('Victoria')
        cy.get('#lastName').type('Duarte')
        cy.get('#email').type('victoria.example.com')
        cy.get('#open-text-area').type('test')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('phone field remains empty when filled with a non-numeric value', function () {
        cy.get('#phone').type('test').should('have.value', '')
    })

    Cypress._.times(3, () => {
        it('displays an error message when the telephone number becomes required but is not filled in before submitting the form', function () {
            cy.clock()

            cy.get('#firstName').type('Victoria')
            cy.get('#lastName').type('Duarte')
            cy.get('#email').type('victoria@example.com')
            cy.get('#phone-checkbox').check()
            cy.get('#open-text-area').type('test')
            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')

            cy.tick(THREE_SECONDS_IN_MS)
            cy.get('.error').should('not.be.visible')
        })
    })

    it('fill out and clear the name, surname, email and telephone fields', function () {
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

    it('displays an error message when submitting the form without filling out the required fields', function () {
        cy.clock()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('successfully submits the form using a custom command', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('select a product (YouTube) by its text', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('select a product (Mentoria) by its value', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('select a product (Blog) by its index', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('mark the type of service "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })

    it('mark each type of service', function () {
        cy.get('[type="radio"]')
            .should('have.length', 3)
            .each(radio => {
                cy.get(radio).check()
                    .should('be.checked')
            })
    })

    it('check both checkboxes, then uncheck the last one', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('select a file from the fixtures folder', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('select a file by simulating drag-and-drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('select a file using a fixture that has been given an alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function (input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifies that the privacy policy opens in another tab without a click', function () {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    })

    it('go to the privacy policy page, remove the target and click the link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('h1#title', 'CAC TAT - Política de privacidade').should('be.visible',)
    })

    it('display and hide success and error messages using .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('fills the text area using the invoke command', () => {
        const longText = Cypress._.repeat('test', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('make an HTTP request', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (response) {
                const { status, statusText, body } = response
                expect(status).to.equal(200);
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it.only('challenge: find the hidden cat', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'I 💜 cats')
    })
})