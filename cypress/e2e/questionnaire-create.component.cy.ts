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
    cy.url().should('include', 'questionnaires/create');

    // should add a segment at the create questionnaire page and fill the forms in
    cy.get('#addSegmentBtn').click();

    // fill in segment form
    cy.get('#segmentName').type('test');
    cy.get('#segmentDescription').type('test');
  })

  it('Should add a question in the questionnaire form', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmind@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();

    // should go to create questionnaire page
    cy.visit('/questionnaires/new');
    cy.url().should('include', 'questionnaires/create');

    // should add a segment in order to add a question
    cy.get('#addSegmentBtn').click();

    // should add a question in the questionnaire create page and fill the forms in
    cy.get('#addQuestionBtn').click();

    // fill in question form
    cy.get('#questionName').type('test');
    cy.get('#questionType').type('Optie a');
    cy.get('#questionType').type('Optie b');
    cy.get('#questionType').type('Optie c');
    cy.get('#questionType').type('Optie d');
  })

  it('Should delete a segment in the questionnaire form', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmin@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();

    // should go to create questionnaire page
    cy.visit('/questionnaires/new');
    cy.url().should('include', 'questionnaires/create');

    //Should delete a segment in the questionnaire form
    cy.get('#deleteSegmentBtn').click();
  })

  it('Should delete a question in the questionnaire form', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('spineadmin@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();

    // should go to create questionnaire page
    cy.visit('/questionnaires/new');
    cy.url().should('include', 'questionnaires/create');

    // should add a segment in order to add a question
    cy.get('#addSegmentBtn').click();

    //Should delete a question in the questionnaire form
    cy.get('#deleteQuestionBtn').click();
  })
});
