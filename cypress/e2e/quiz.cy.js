// End-to-end tests for Tech Quiz

describe('Tech Quiz', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions', { fixture: 'questions.json' }).as('getQuestions');
    cy.visit('/');
    cy.wait('@getQuestions'); // Wait for the API call to complete
    cy.log('Visited the homepage and waited for questions');
  });
  
  it('should start the quiz when the start button is clicked', () => {
    cy.get('[data-cy=start-button]').should('be.visible').click();
    cy.get('[data-cy=question]').should('be.visible');
    cy.log('Started the quiz and verified the first question is visible');
  });
  
  it('should display the next question when an answer is selected', () => {
    cy.get('[data-cy=start-button]').click();
    cy.get('[data-cy=answer-button]').first().click();
    cy.get('[data-cy=question]').should('be.visible');
    cy.log('Selected an answer and verified the next question is visible');
  });
  
  it('should display the final score when the quiz is completed', () => {
    cy.get('[data-cy=start-button]').click();
    for (let i = 0; i < 10; i++) {
      cy.get('[data-cy=answer-button]').first().click();
    }
    cy.get('[data-cy=score]').should('be.visible');
    cy.log('Completed the quiz and verified the final score is visible');
  });
  
  it('should allow starting a new quiz after completion', () => {
    cy.get('[data-cy=start-button]').click();
    for (let i = 0; i < 10; i++) {
      cy.get('[data-cy=answer-button]').first().click();
    }
    cy.get('[data-cy=score]').should('be.visible');
    cy.get('[data-cy=start-new-quiz-button]').click();
    cy.get('[data-cy=start-button]').should('be.visible');
    cy.log('Started a new quiz after completion and verified the start button is visible');
  });
});