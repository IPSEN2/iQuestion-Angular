describe('QuestionnaireComponent', () => {
  it('Should export a CSV with questionnaire entries', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmin@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');

    // click export csv button
    cy.get('.exportCsvButton').first().click();

    // get file name of file to download so it can be checked
    cy.get('.exportCsvButton').first()
      .invoke('attr', 'data-questionnaire-name')
      .then((questionnaireName) => {
        cy.readFile('cypress/downloads/' + questionnaireName + '.csv', { timeout: 3000 });
      });
  });

  it('Should export a JSON with questionnaire entries', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmin@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');

    // click export csv button
    cy.get('.exportJsonButton').first().click();

    // get file name of file to download so it can be checked
    cy.get('.exportJsonButton').first()
      .invoke('attr', 'data-questionnaire-name')
      .then((questionnaireName) => {
        cy.readFile('cypress/downloads/' + questionnaireName + '.json', { timeout: 3000 });
      });
  });
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
        cy.get('app-toasts').should('contain', '✅ - Successvol verwijderd!');
    })
});
