describe('EntriesComponent', () => {
  it('Should show a list with entries', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('caregiver@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');
    cy.get('a').contains("Inzendingen").click();
    cy.url().should('include', 'entries');

    // wait for api
    cy.wait(1000);

    // check if table has rows
    cy.get('table').find('tr').should('have.length.greaterThan', 1);
  });

  it("Should visit entry view", () => {
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('caregiver@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');
    cy.get('a').contains("Inzendingen").click();
    cy.get('.entryViewButton').first().click();
    cy.url().should('include', 'entries/');

  })
});
