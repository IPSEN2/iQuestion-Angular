describe('QuestionnaireFillComponent', () => {
    it('Should create a questionnaire entry when valid data is provided', () => {
        // log in
        cy.visit('/');
        cy.url().should('includes', '');
        cy.get('[formControlName="email"]').type('caregiver@test.com');
        cy.get('[formControlName="password"]').type('12345678');
        cy.get('button').click();
        cy.url().should('include', 'questionnaires');

        // go to questionnaire fill page
        cy.visit('/questionnaires/fill/4f83415c-4489-4f4a-be74-4b1110ee5803');
        cy.url().should('include', 'questionnaire');

        // create intercept so API request can be checked
        cy.intercept({
            method: 'PUT',
            url: '/entry/',
        }).as('entryCreate');

        // fill in questionnaire
        cy.get('#7e1a51b2-0fcb-42dc-b6bd-eadae267cba2').type('test');
        cy.get('#c4d246d3-9c35-4363-9c21-faf30049f3e9').type('test');
        cy.get('#submitBtn').click();

        // check if API request was successful
        cy.wait("@entryCreate").then(({response}) => {
            if (response) {
                expect(response.statusCode).to.eq(200)
            } else {
                throw new Error("No response found")
            }
        })

        cy.wait(500);
        cy.get('app-toasts').should('contain', 'Opgeslagen, u wordt doorverwezen...');

        // check if user is redirected to questionnaire list page
        cy.url().should('include', 'questionnaires');
    })
});
