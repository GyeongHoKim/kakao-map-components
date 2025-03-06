import '@/components/api-loader/api-loader';
import { html } from "lit";

describe('kakao-api-loader', () => {
  it('should render loading state initially and success state after kakao script loads', () => {
    // arrange
    const appkey = Cypress.env('appkey');
    cy.mount<"kakao-api-loader">(html`
      <kakao-api-loader appkey=${appkey}>
        <span id="success">success</span>
        <span id="error" slot="error">error</span>
        <span id="loading" slot="loading">loading</span>
      </kakao-api-loader>
    `);

    // act & assert
    cy.get('#loading').should('be.visible');
    cy.get('#success').should('not.be.visible');
    cy.get('#error').should('not.be.visible');

    cy.window().then((win) => {
      cy.wrap(win).should('have.property', 'kakao');
      cy.get('#success').should('be.visible');
      cy.get('#loading').should('not.be.visible');
      cy.get('#error').should('not.be.visible');
    });
  })
})