describe('QuestionnaireComponent', () => {
    it('Should delete a questionnaire', () => {
        // log in
        cy.visit('/');
        cy.url().should('includes', '');
        cy.get('[formControlName="email"]').type('spineadmin@test.com');
        cy.get('[formControlName="password"]').type('12345678');
        cy.get('button').click();
        cy.url().should('include', 'questionnaires');

        // delete a questionnaire
        cy.get('.deleteQuestionnaireButton').first().click();
        // intercept the call, and return a 200 status code
        cy.intercept("DELETE", 'http://localhost:8080/questionnaire/*', {statusCode: 200});
        cy.get('.deleteButton').click();
    })
});
