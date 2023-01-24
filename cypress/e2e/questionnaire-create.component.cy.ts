describe('QuestionnairesCreateComponent', () => {
  it('Should add a segment in the questionnaire form and fill in the forms', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmin@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');

    // should go to create questionnaire page
    cy.visit('/questionnaires/new');
    cy.url().should('include', 'questionnaires/new');

    // should add a segment at the create questionnaire page and fill the forms in
    cy.get('#segmentToevoegen').click();

    // fill in segment form
    cy.get('#naamSegment').type('test');
    cy.get('#beschrijving').type('test');
  })

  it('Should add a question in the questionnaire form and fill in the question forms', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmin@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');

    // should go to create questionnaire page
    cy.visit('/questionnaires/new');
    cy.url().should('include', 'questionnaires/new');

    // should add a segment in order to add a question
    cy.get('#segmentToevoegen').click();

    // should add a question in the questionnaire create page and fill the forms in
    cy.get('#vraagToevoegen').click();

    // fill in question form
    cy.get('#vraagNaam').type('test', {force: true});
    cy.get('#vraagOpties').type('Optie a \n Optie b \n Optie c \n Optie d', {force: true});
  })

  it('Should delete a segment in the questionnaire form', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmin@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');

    // should go to create questionnaire page
    cy.visit('/questionnaires/new');
    cy.url().should('include', 'questionnaires/new');

    // should add a segment in order to delete a segment
    cy.get('#segmentToevoegen').click();

    //Should delete a segment in the questionnaire form
    cy.get('#segmentVerwijderen').click();
  })

  it('Should delete a question in the questionnaire form', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmin@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');

    // should go to create questionnaire page
    cy.visit('/questionnaires/new');
    cy.url().should('include', 'questionnaires/new');

    // should add a segment in order to add a question
    cy.get('#segmentToevoegen').click();

    // should add a question in order to delete a question
    cy.get('#vraagToevoegen').click();

    //Should delete a question in the questionnaire form
    cy.get('#vraagVerwijderen').click({force: true});
  })
});
