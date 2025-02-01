// End-to-end tests for Tech Quiz

describe('Tech Quiz', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should start the quiz when the start button is clicked', () => {
      cy.get('[data-cy=start-button]').click();
      cy.get('[data-cy=question]').should('be.visible');
    });
  
    it('should display the next question when an answer is selected', () => {
      cy.get('[data-cy=start-button]').click();
      cy.get('[data-cy=answer-button]').first().click();
      cy.get('[data-cy=question]').should('be.visible');
    });
  
    it('should display the final score when the quiz is completed', () => {
      cy.get('[data-cy=start-button]').click();
      for (let i = 0; i < 10; i++) {
        cy.get('[data-cy=answer-button]').first().click();
      }
      cy.get('[data-cy=score]').should('be.visible');
    });
  
    it('should allow starting a new quiz after completion', () => {
      cy.get('[data-cy=start-button]').click();
      for (let i = 0; i < 10; i++) {
        cy.get('[data-cy=answer-button]').first().click();
      }
      cy.get('[data-cy=score]').should('be.visible');
      cy.get('[data-cy=start-new-quiz-button]').click();
      cy.get('[data-cy=start-button]').should('be.visible');
    });
  });