describe('ResetPasswordComponent', () => {
    // It should give an error when the email is invalid
    it('Should give an error when the email is invalid', () => {
        // Go to the reset password page
        cy.visit('/change-password');
        // Check if we are on the right page
        cy.url().should('includes', 'change-password');
        // Set the email
        cy.get('[formControlName="email"]').type('test@test.com');
        // Get button with id submitBtn and click it
        cy.get('#submitBtn').click();
        // Check if a toast is shown saying: "Het e-mail adres is niet gevonden"
        cy.get('app-toasts').should('contain', 'Het e-mail adres is niet gevonden');
    });

    // The submit button should be disabled when the email is invalid
    it('The submit button should be disabled when the email is invalid', () => {
        // Go to the reset password page
        cy.visit('/change-password');
        // Check if we are on the right page
        cy.url().should('includes', 'change-password');
        // Set the email
        cy.get('[formControlName="email"]').type('randomStringofCharacters');
        // Check if the submit button is disabled
        cy.get('#submitBtn').should('be.disabled');
    });

    // When the email is valid, the submit button should be enabled
    it('When the email is valid, the submit button should be enabled', () => {
        // Go to the reset password page
        cy.visit('/change-password');
        // Check if we are on the right page
        cy.url().should('includes', 'change-password');
        // Set the email
        cy.get('[formControlName="email"]').type('caregiver@test.com');
        // Check if the submit button is enabled
        cy.get('#submitBtn').should('be.enabled');
    });

    // It should send a reset password email when the email is valid
    it('Should send a reset password email when the email is valid', () => {
        // Go to the reset password page
        cy.visit('/change-password');
        // Check if we are on the right page
        cy.url().should('includes', 'change-password');
        // Set the email
        cy.get('[formControlName="email"]').type('caregiver@test.com');
        // Get button with id submitBtn and click it
        cy.get('#submitBtn').click();
        // Check if there is a request to the api
        // The body should contain {email: "caregiver@test.com"}
        cy.intercept('POST', 'localhost:8080/auth/request-password-reset', (req) => {
            expect(req.body).to.have.property('email', 'caregiver@test.com');
        });
    });
});