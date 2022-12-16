describe('test', () => {
  it('should not login if email adress is invalid', function () {
    cy.visit("/");
    cy.url().should('includes', '');
    cy.get('[formControlName="email"').type('geenAtSign');
    cy.get('[formControlName="password"').type('TestLangGenoegWachtwoord1!');
    cy.get('button').should('be.disabled');
  });

  it('Should not login if password is to short', () => {
    cy.visit("/");
    cy.url().should('includes', '');
    cy.get('[formControlName="email"').type('geenAtSign');
    cy.get('[formControlName="password"').type('Kort@!');
    cy.get('button').should('be.disabled');
  });

  it('should not login if invalid but validated credentials are provided', function () {
    cy.visit("/");
    cy.url().should('includes', '');
    cy.get('[formControlName="email"').type('test@account.com');
    cy.get('[formControlName="password"').type('TestLangGenoeg1!');
    cy.get('button').click();
    cy.url().should('includes', '');
    cy
  });
})
