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
        cy.visit('/questionnaires/fill/4aea583c-61a3-4e89-a315-c2f30cc52fc9');
        cy.url().should('include', 'questionnaire');

        // create intercept so API request can be checked
        cy.intercept({
            method: 'PUT',
            url: '/entry/',
        }).as('entryCreate');

        // fill in questionnaire
        cy.get('#20ed63a4-b160-4b9b-8665-422938938088').select('Optie a')
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
